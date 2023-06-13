import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Signin from '../models/signin';
import { verifyJWT } from '../middlewares/loginRequired';

class HomeController {
  async index(req, res) {
    res.json({
      success: true,
    });
  }

  async login(req, res) {
    const { username = '', email = '', password = '' } = req.body;

    if (!username && !email) {
      return res.status(401).json({
        errors: ['Precisa informar um username ou e-mail'],
      });
    }

    if (!password) {
      return res.status(401).json({
        errors: ['Precisa informar uma senha'],
      });
    }

    const user = await User.findOne({ where: { [Op.or]: [{ username }, { email }] } });

    if (!user) {
      return res.status(401).json({
        errors: ['Usuário não existe'],
      });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Senha inválida'],
      });
    }

    const {
      id, username: uusername, email: uemail, name: uname,
    } = user;
    const token = jwt.sign({ id, username: uusername, email: uemail }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    // Check for old expired tokens (for database clean)
    const oldsignins = await Signin.findAll({ where: { user_id: id } });
    if (oldsignins) {
      oldsignins.forEach(async (oldsignin) => {
        const { expired } = verifyJWT(oldsignin.token);
        if (expired) {
          await oldsignin.destroy();
        }
      });
    }

    await Signin.create({
      user_id: id,
      ip: req.ip,
      token,
    });

    return res.json({
      token,
      user: {
        id, username: uusername, name: uname, email: uemail,
      },
    });
  }

  async logout(req, res) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        errors: ['Você não está logado no sistema'],
      });
    }

    const [, token] = authorization.split(' ');

    try {
      const payload = jwt.verify(token, process.env.TOKEN_SECRET);
      const { id, username, email } = payload;

      const user = await User.findOne({
        where: {
          id,
          username,
          email,
        },
      });

      if (!user) {
        return res.status(401).json({
          errors: ['Usuário inválido'],
        });
      }

      const signin = await Signin.findOne({ where: { token } });

      if (!signin) {
        return res.status(401).json({
          errors: ['Token inválido'],
        });
      }

      await signin.destroy();

      return res.json({
        success: true,
      });
    } catch (e) {
      console.log(e);
      return res.status(401).json({
        errors: ['Token expirado ou inválido.'],
      });
    }
  }
}

export default new HomeController();
