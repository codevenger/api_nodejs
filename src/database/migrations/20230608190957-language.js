module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('languages', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    abbr: {
      type: Sequelize.STRING(10),
      allowNull: false,
      unique: true,
    },
    descrp: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    descri: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('languages'),
};
