const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Role = sequelize.define('role', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'role',
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
  Role.associate = (models) => {
    Role.belongsToMany(models.action, { as: 'action_id_actions', through: models.role_action, foreignKey: "role_id", otherKey: "action_id" });
    Role.hasMany(models.role_action, { as: "role_actions", foreignKey: "role_id" });
    Role.hasMany(models.staff, { as: "staffs", foreignKey: "role_id" });
  };

  return Role;
};
