const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const NewsLetter = sequelize.define('newsletter', {
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'newsletter',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
  // 🛠 Định nghĩa quan hệ trong associate()
  NewsLetter.associate = (models) => {

  };
  return NewsLetter;
};
