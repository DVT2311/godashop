const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ward', {
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
    district_id: {
      type: DataTypes.STRING(5),
      allowNull: false,
      references: {
        model: 'district',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'ward',
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
        name: "district_id",
        using: "BTREE",
        fields: [
          { name: "district_id" },
        ]
      },
    ]
  });
};
