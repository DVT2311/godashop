const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('newsletter', {
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
};
