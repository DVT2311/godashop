'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('staff', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'role',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      mobile: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      username: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: "username_2"
      },
      password: {
        type: Sequelize.STRING(32),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: "email"
      },
      is_active: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('staff');
  },
};
