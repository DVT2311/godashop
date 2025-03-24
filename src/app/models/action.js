const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Action = sequelize.define('action', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'action',
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
  Action.associate = (models) => {
    Action.belongsToMany(models.role, { as: 'role_id_roles', through: models.role_action, foreignKey: "action_id", otherKey: "role_id" });

    Action.hasMany(models.role_action, { as: 'role_actions', foreignKey: "action_id" });
  };
  return Action;
};
