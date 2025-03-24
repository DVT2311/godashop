const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Comment = sequelize.define('comment', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    fullname: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    star: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'comment',
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
        name: "product_id",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
  // 🛠 Định nghĩa quan hệ trong associate()
  Comment.associate = (models) => {
    Comment.belongsTo(models.product, { foreignKey: "product_id", as: "product" });
  };
  return Comment;
};
