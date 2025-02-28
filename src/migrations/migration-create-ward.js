'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ward', {
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
      district_id: {
        type: Sequelize.STRING(5),
        allowNull: false,
        references: {
          model: 'district',
          key: 'id'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ward');
  },
};
