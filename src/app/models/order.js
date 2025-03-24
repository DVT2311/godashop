const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Order = sequelize.define('order', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    order_status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'status',
        key: 'id'
      }
    },
    staff_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'staff',
        key: 'id'
      }
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customer',
        key: 'id'
      }
    },
    shipping_fullname: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    shipping_mobile: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    payment_method: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "0:COD, 1: bank"
    },
    shipping_ward_id: {
      type: DataTypes.STRING(5),
      allowNull: true,
      references: {
        model: 'ward',
        key: 'id'
      }
    },
    shipping_housenumber_street: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    shipping_fee: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    delivered_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'order',
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
        name: "order_order_status_fk_1",
        using: "BTREE",
        fields: [
          { name: "order_status_id" },
        ]
      },
      {
        name: "order_staff_fk_1",
        using: "BTREE",
        fields: [
          { name: "staff_id" },
        ]
      },
      {
        name: "order_customer_fk_1",
        using: "BTREE",
        fields: [
          { name: "customer_id" },
        ]
      },
      {
        name: "shipping_ward",
        using: "BTREE",
        fields: [
          { name: "shipping_ward_id" },
        ]
      },
    ]
  });
  // 🛠 Định nghĩa quan hệ trong associate()
  Order.associate = (models) => {
    Order.belongsToMany(models.product, { as: 'product_id_products', through: models.order_item, foreignKey: "order_id", otherKey: "product_id" });

    Order.belongsTo(models.customer, { foreignKey: "customer_id", as: "customer" });

    Order.hasMany(models.order_item, { foreignKey: "order_id", as: "order_items" });

    Order.belongsTo(models.staff, { foreignKey: "staff_id", as: "staff" });

    Order.belongsTo(models.status, { foreignKey: "order_status_id", as: "order_status" });

    Order.belongsTo(models.ward, { foreignKey: "shipping_ward_id", as: "shipping_ward" });

  };
  return Order;
};
