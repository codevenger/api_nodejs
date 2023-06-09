import Sequelize, { Model } from 'sequelize';

export default class Signin extends Model {
  static init(sequelize) {
    super.init({
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ip: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      tableName: 'signin',
    });
    return this;
  }
}
