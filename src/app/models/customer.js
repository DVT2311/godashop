const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customer', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    mobile: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "email"
    },
    login_by: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    ward_id: {
      type: DataTypes.STRING(5),
      allowNull: true,
      references: {
        model: 'ward',
        key: 'id'
      }
    },
    shipping_name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    shipping_mobile: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    housenumber_street: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    is_active: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'customer',
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
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "ward_id",
        using: "BTREE",
        fields: [
          { name: "ward_id" },
        ]
      },
    ]
  });
};
