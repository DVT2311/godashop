const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Ward = sequelize.define('ward', {
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
  // 🛠 Định nghĩa quan hệ trong associate()
  Ward.associate = (models) => {
    Ward.belongsTo(models.district, { as: "district", foreignKey: "district_id" });
    Ward.hasMany(models.customer, { as: "customers", foreignKey: "ward_id" });
    Ward.hasMany(models.order, { as: "orders", foreignKey: "shipping_ward_id" });
  };
  return Ward;
};
