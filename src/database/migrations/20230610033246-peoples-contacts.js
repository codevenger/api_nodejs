module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('peoples_contacts', {
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
        model: 'peoples',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    contact_type_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'contacts_type',
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

  down: (queryInterface) => queryInterface.dropTable('peoples_contacts'),
};
