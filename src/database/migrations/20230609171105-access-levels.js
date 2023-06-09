module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('access_levels', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: false,
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

  down: (queryInterface) => queryInterface.dropTable('access_levels'),
};
