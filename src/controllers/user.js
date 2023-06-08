import Language from '../models/language';
import User from '../models/user';

class UserController {
  // List all Users
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password_hash', 'language_id'] },
        include: [{
          model: Language,
          attributes: ['id', 'abbr', 'descrp', 'descri'],
        }],
      });
      return res.json(users);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Create a new user
  async store(req, res) {
    try {
      const user = await User.create(req.body);
      const { id, username, name, email, created_at, updated_at } = user;
      return res.json({ id, username, name, email, created_at, updated_at });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Show User
  async view(req, res) {
    try {
      const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password_hash'] } });

      if (!user) {
        return res.status(404).json({
          errors: ['Usuário não existe'],
        });
      }

      return res.json(user);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Update User
  async update(req, res) {
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
      const { id, username, name, email, blocked, created_at, updated_at } = newData;
      return res.json({ id, username, name, email, blocked, created_at, updated_at });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Delete
  async delete(req, res) {
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
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
