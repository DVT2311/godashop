'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customer', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(32),
        allowNull: false
      },
      mobile: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: "email"
      },
      login_by: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      ward_id: {
        type: Sequelize.STRING(5),
        allowNull: true,
        references: {
          model: 'ward',
          key: 'id'
        }
      },
      shipping_name: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      shipping_mobile: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      housenumber_street: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      is_active: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('customer');
  },
};
