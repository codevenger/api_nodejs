import Language from '../models/language';
import User from '../models/user';
import AccessLevel from '../models/access_level';

class UserController {
  // List all Users
  async index(req, res, next) {
    try {
      const users = await User.findAll({
        attributes: {
          exclude: ['password_hash', 'language_id', 'access_level_id'],
        },
        include: [{
          model: Language,
          attributes: ['id', 'abbr', 'descrp', 'descri'],
        }, {
          model: AccessLevel,
          attributes: ['id', 'descrp', 'descri'],
        }],
      });
      return res.json(users);
    } catch (err) {
      return next(err);
    }
  }

  // Create a new user
  async store(req, res, next) {
    try {
      const user = await User.create(req.body);
      delete user.dataValues.password_hash;
      return res.json(user);
    } catch (err) {
      return next(err);
    }
  }

  // Show User
  async view(req, res, next) {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: {
          exclude: ['password_hash', 'language_id', 'access_level_id'],
        },
        include: [{
          model: Language,
          attributes: ['id', 'abbr', 'descrp', 'descri'],
        }, {
          model: AccessLevel,
          attributes: ['id', 'descrp', 'descri'],
        }],
      });

      if (!user) {
        return res.status(404).json({
          errors: ['Usuário não existe'],
        });
      }

      return res.json(user);
    } catch (err) {
      return next(err);
    }
  }

  // Update User
  async update(req, res, next) {
    try {
      const userId = req.params.id;

      if (!userId) {
        return res.status(400).json({
          errors: ['Código não informado'],
        });
      }

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({
          errors: ['Usuário não existe'],
        });
      }

      const newData = await user.update(req.body);
      delete newData.dataValues.password_hash;
      return res.json(newData);
    } catch (err) {
      return next(err);
    }
  }

  // Delete
  async delete(req, res, next) {
    try {
      const userId = req.params.id;

      if (!userId) {
        return res.status(400).json({
          errors: ['Código não informado'],
        });
      }

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({
          errors: ['Usuário não existe'],
        });
      }

      await user.destroy();
      return res.json({ deleted: userId });
    } catch (err) {
      return next(err);
    }
  }
}

export default new UserController();
