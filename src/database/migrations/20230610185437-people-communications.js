module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('people_communications', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    people_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'people',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    communication_type_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'communication_types',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    value: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('people_communications'),
};
