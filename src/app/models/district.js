const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('district', {
    id: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    province_id: {
      type: DataTypes.STRING(5),
      allowNull: false,
      references: {
        model: 'province',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'district',
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
        name: "province_id",
        using: "BTREE",
        fields: [
          { name: "province_id" },
        ]
      },
    ]
  });
};
