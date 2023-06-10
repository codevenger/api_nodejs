import Language from '../models/language';
import User from '../models/user';
import AccessLevel from '../models/access_level';

class UserController {
  // List all Users
  async index(req, res) {
    // Accepted access for Admin, Super and Editor
    if (!req.userAccess || req.userAccess > 5) {
      return res.status(403).json({
        errors: ['Acesso negado'],
      });
    }
    try {
      const users = await User.findAll({
        attributes: {
          exclude: ['password_hash', 'language_id', 'access_level_id']
        },
        include: [{
          model: Language,
          attributes: ['id', 'abbr', 'descrp', 'descri'],
        },{
          model: AccessLevel,
          attributes: ['id', 'descrp', 'descri'],
        }],
      });
      return res.json(users);
    } catch (e) {
      if(e.errors) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message),
        });
      }
      return res.status(400).json({
        errors: [ e.message ]
      });
    }
  }

  // Create a new user
  async store(req, res) {
    // Only access for Admin and Super
    if (!req.userAccess || req.userAccess > 3) {
      return res.status(403).json({
        errors: ['Acesso negado'],
      });
    }
    try {
      const user = await User.create(req.body);
      delete user.dataValues['password_hash'];
      return res.json(user);
    } catch (e) {
      if(e.errors) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message),
        });
      }
      return res.status(400).json({
        errors: [ e.message ]
      });
    }
  }

  // Show User
  async view(req, res) {
    if (!req.userAccess || req.userAccess > 5) {
      return res.status(403).json({
        errors: ['Acesso negado'],
      });
    }
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: {
          exclude: ['password_hash', 'language_id', 'access_level_id']
        },
        include: [{
          model: Language,
          attributes: ['id', 'abbr', 'descrp', 'descri'],
        },{
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
    } catch (e) {
      if(e.errors) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message),
        });
      }
      return res.status(400).json({
        errors: [ e.message ]
      });
    }
  }

  // Update User
  async update(req, res) {
    if (!req.userAccess || req.userAccess > 3) {
      return res.status(403).json({
        errors: ['Acesso negado'],
      });
    }
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
      delete newData.dataValues['password_hash'];
      return res.json(newData);
    } catch (e) {
      if(e.errors) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message),
        });
      }
      return res.status(400).json({
        errors: [ e.message ]
      });
    }
  }

  // Delete
  async delete(req, res) {
    if (!req.userAccess || req.userAccess > 3) {
      return res.status(403).json({
        errors: ['Acesso negado'],
      });
    }
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
    } catch (e) {
      if(e.errors) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message),
        });
      }
      return res.status(400).json({
        errors: [ e.message ]
      });
    }
  }
}

export default new UserController();
