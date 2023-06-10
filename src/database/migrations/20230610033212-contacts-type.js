module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('contacts_type', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    descrp: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    descri: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('contacts_type'),
};
