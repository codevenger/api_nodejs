import jwt from 'jsonwebtoken';
import User from '../models/user';
import Signin from '../models/signin';
import { Op } from "sequelize";

class HomeController {
  async index(req, res) {
    res.json({
      success: true,
      errors: [],
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

    const user = await User.findOne({ where: { [Op.or]: [{username}, {email}] }});

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

    const { id } = user;
    const token = jwt.sign({ id, username, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    const signin = await Signin.create({
      user_id: id,
      ip: req.ip,
      token,
    });

    return res.json({ token, user: { id, username: user.username, name: user.name, email: user.email } });
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
        errors: [],
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
