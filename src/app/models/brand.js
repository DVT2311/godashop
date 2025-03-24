const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Brand = sequelize.define('brand', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'brand',
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
  Brand.associate = (models) => {
    Brand.hasMany(models.product, { foreignKey: "brand_id", as: "products" });
  };
  return Brand;
};
