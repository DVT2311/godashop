const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Province = sequelize.define('province', {
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
    }
  }, {
    sequelize,
    tableName: 'province',
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
    ]
  });
  // 🛠 Định nghĩa quan hệ trong associate()
  Province.associate = (models) => {
    Province.hasMany(models.district, { as: 'districts', foreignKey: "province_id" });

    Province.hasMany(models.transport, { as: 'transports', foreignKey: "province_id" });
  };
  return Province;
};
