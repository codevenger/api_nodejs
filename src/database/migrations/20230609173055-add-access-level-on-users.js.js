module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'users',
    'access_level_id',
    {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 9,
      references: {
        model: 'access_levels',
        key: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
  ),

  down: () => {},
};
