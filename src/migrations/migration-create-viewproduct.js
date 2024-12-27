'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ViewProducts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      barcode: {
        type: Sequelize.STRING(13),
        allowNull: false,
      },
      sku: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      discount_percentage: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      discount_from_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      discount_to_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      featured_image: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      inventory_qty: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      brand_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      created_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      star: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: null,
      },
      featured: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        comment: '1: nổi bật',
      },
      sale_price: {
        type: Sequelize.DECIMAL(26, 0),
        allowNull: true,
        defaultValue: null,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ViewProducts');
  },
};
