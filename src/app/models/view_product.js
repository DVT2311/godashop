const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Products = sequelize.define('view_product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  barcode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  discount_from_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  discount_to_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  featured_image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  inventory_qty: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  brand_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  created_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  star: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  featured: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  sale_price: {
    type: DataTypes.DECIMAL(26, 0),
    allowNull: true,
  }

}, {
  tableName: 'view_product', // Tên bảng trong cơ sở dữ liệu

  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // If don't want createdAt
  // createdAt: false,

  // If don't want updatedAt
  // updatedAt: false,

  // your other configuration here
  // attributes: ['id', 'barcode', 'sku', 'name', 'price', 'discount_from_date', 'discount_to_date', 'featured_image',
  // 'inventory_qty', 'category_id', 'brand_id', 'created_date', 'description', 'star', 'featured', 'sale_price'],
});

module.exports = Products;
