const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Transport = sequelize.define('transport', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    province_id: {
      type: DataTypes.STRING(5),
      allowNull: true,
      references: {
        model: 'province',
        key: 'id'
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'transport',
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
        name: "transport_province_id",
        using: "BTREE",
        fields: [
          { name: "province_id" },
        ]
      },
    ]
  });
  // 🛠 Định nghĩa quan hệ trong associate()
  Transport.associate = (models) => {
    Transport.belongsTo(models.province, { as: "province", foreignKey: "province_id" });
  };
  return Transport;
};
