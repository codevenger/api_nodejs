import User from '../models/user';
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

    return res.json(user);
  }
}

export default new HomeController();
