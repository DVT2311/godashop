const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Order_Item = sequelize.define('order_item', {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'order',
        key: 'id'
      }
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unit_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'order_item',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "product_id" },
          { name: "order_id" },
        ]
      },
      {
        name: "order_item_product_fk_1",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "order_item_order_fk_1",
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
    ]
  });
  // 🛠 Định nghĩa quan hệ trong associate()
  Order_Item.associate = (models) => {
    Order_Item.belongsTo(models.order, { foreignKey: "order_id", as: "order" });

    Order_Item.belongsTo(models.product, { foreignKey: "product_id", as: "product" });
  };
  return Order_Item;
};
