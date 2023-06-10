import Sequelize, { Model } from 'sequelize';

export default class ContactType extends Model {
  static init(sequelize) {
    super.init({
      descrp: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 255],
            msg: 'Descrição em português precisa ter entre 2 e 255 caracteres.',
          },
        },
      },
      descri: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 255],
            msg: 'Descrição em inglês precisa ter entre 2 e 255 caracteres.',
          },
        },
      },
    }, {
      sequelize,
      tableName: 'contacts_type',
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.PeopleContact, { foreignKey: 'contact_type_id' });
  }
}
