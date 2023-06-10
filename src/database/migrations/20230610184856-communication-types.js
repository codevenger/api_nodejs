module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('communication_types', {
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

  down: (queryInterface) => queryInterface.dropTable('communication_types'),
};
