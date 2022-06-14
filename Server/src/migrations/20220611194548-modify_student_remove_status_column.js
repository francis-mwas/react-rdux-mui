'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.removeColumn('Students', 'status_active');
  },

  async down(queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Students', // table name
      'status_active', // new field name
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false,
      }
    );
  },
};
