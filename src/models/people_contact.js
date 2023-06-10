import Sequelize, { Model } from 'sequelize';

export default class PeopleContact extends Model {
  static init(sequelize) {
    super.init({
      value: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 255],
            msg: 'Informe um valor entre 2 e 255 caracteres.',
          },
        },
      },
    }, {
      sequelize,
      tableName: 'peoples_contacts',
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.ContactType, { foreignKey: 'contact_type_id' });
    this.belongsTo(models.People, { foreignKey: 'people_id' });
  }
}
