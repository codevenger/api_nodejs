module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'users',
    'language_id',
    {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'languages',
        key: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
  ),

  down: () => {},
};
