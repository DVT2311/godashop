'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('newsletter', {
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        primaryKey: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('newsletter');
  },
};
