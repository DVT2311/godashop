'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('district', {
      id: {
        type: Sequelize.STRING(5),
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      type: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      province_id: {
        type: Sequelize.STRING(5),
        allowNull: false,
        references: {
          model: 'province',
          key: 'id'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('district');
  },
};
