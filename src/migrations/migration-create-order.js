'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      created_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      order_status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'status',
          key: 'id'
        }
      },
      staff_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'staff',
          key: 'id'
        }
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'customer',
          key: 'id'
        }
      },
      shipping_fullname: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      shipping_mobile: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      payment_method: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0,
        comment: "0:COD, 1: bank"
      },
      shipping_ward_id: {
        type: Sequelize.STRING(5),
        allowNull: true,
        references: {
          model: 'ward',
          key: 'id'
        }
      },
      shipping_housenumber_street: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      shipping_fee: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      delivered_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order');
  },
};
