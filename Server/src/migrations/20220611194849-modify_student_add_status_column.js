'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
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

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeColumn('Students', 'status_active');
  },
};
