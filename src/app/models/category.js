const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Category = sequelize.define('category', {
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
    tableName: 'category',
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
  Category.associate = (models) => {
    Category.hasMany(models.product, { foreignKey: "category_id", as: "products" });
  };
  return Category;
};
