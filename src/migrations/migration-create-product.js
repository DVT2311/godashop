'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      barcode: {
        type: Sequelize.STRING(13),
        allowNull: false,
        unique: "barcode"
      },
      sku: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(300),
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      discount_percentage: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      discount_from_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      discount_to_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      featured_image: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      inventory_qty: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'category',
          key: 'id'
        }
      },
      brand_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'brand',
          key: 'id'
        }
      },
      created_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      star: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      featured: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        comment: "1: nổi bật"
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product');
  },
};
