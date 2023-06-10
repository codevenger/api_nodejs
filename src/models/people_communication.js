import Sequelize, { Model } from 'sequelize';

export default class PeopleCommunication extends Model {
  static init(sequelize) {
    super.init({
      value: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 255],
            msg: 'Informe um meio de comunicação entre 2 e 255 caracteres.',
          },
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.CommunicationType, { foreignKey: 'communication_type_id' });
    this.belongsTo(models.People, { foreignKey: 'people_id' });
  }
}
