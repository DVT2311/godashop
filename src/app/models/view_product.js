'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ViewProduct extends Model {
    static associate(models) {
      // Define associations here (nếu cần)
    }
  }
  ViewProduct.init(
    {
      barcode: DataTypes.STRING(13),
      sku: DataTypes.STRING(20),
      name: DataTypes.STRING(300),
      price: DataTypes.INTEGER,
      discount_percentage: DataTypes.INTEGER,
      discount_from_date: DataTypes.DATE,
      discount_to_date: DataTypes.DATE,
      featured_image: DataTypes.STRING(100),
      inventory_qty: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      brand_id: DataTypes.INTEGER,
      created_date: DataTypes.DATE,
      description: DataTypes.TEXT,
      star: DataTypes.FLOAT,
      featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: '1: nổi bật',
      },
      // sale_price: DataTypes.DECIMAL(26, 0),
    },
    {
      sequelize,
      modelName: 'View_Product',
      tableName: 'view_product', // Đặt tên bảng cố định
      freezeTableName: true, // Ngăn Sequelize tự động thêm "s"
      timestamps: false, // Tắt tự động thêm cột createdAt và updatedAt
    }
  );
  return ViewProduct;
};
