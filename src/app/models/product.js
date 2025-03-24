const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Product = sequelize.define('product', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    barcode: {
      type: DataTypes.STRING(13),
      allowNull: false,
      unique: "barcode"
    },
    sku: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    discount_percentage: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    discount_from_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    discount_to_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    featured_image: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    inventory_qty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'category',
        key: 'id'
      }
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'brand',
        key: 'id'
      }
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    star: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    featured: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "1: nổi bật"
    }
  }, {
    sequelize,
    tableName: 'product',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "barcode",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "barcode" },
        ]
      },
      {
        name: "product_category_fk_1",
        using: "BTREE",
        fields: [
          { name: "category_id" },
        ]
      },
      {
        name: "brand_id",
        using: "BTREE",
        fields: [
          { name: "brand_id" },
        ]
      },
    ]
  });
  // 🛠 Định nghĩa quan hệ trong associate()
  Product.associate = (models) => {
    Product.belongsToMany(models.order, { as: 'order_id_orders', through: models.order_item, foreignKey: "product_id", otherKey: "order_id" });

    Product.belongsTo(models.brand, { as: 'brand', foreignKey: "brand_id" });

    Product.belongsTo(models.category, { as: 'category', foreignKey: "category_id" });

    Product.hasMany(models.comment, { as: 'comments', foreignKey: "product_id" });

    Product.hasMany(models.image_item, { as: 'image_items', foreignKey: "product_id" });

    Product.hasMany(models.order_item, { as: 'order_items', foreignKey: "product_id" });
  }
  return Product;
};
