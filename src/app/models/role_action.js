const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Role_Action = sequelize.define('role_action', {
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'role',
        key: 'id'
      }
    },
    action_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'action',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'role_action',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "role_id" },
          { name: "action_id" },
        ]
      },
      {
        name: "role_action_role_fk_1",
        using: "BTREE",
        fields: [
          { name: "role_id" },
        ]
      },
      {
        name: "role_action_action_fk_1",
        using: "BTREE",
        fields: [
          { name: "action_id" },
        ]
      },
    ]
  });
  // 🛠 Định nghĩa quan hệ trong associate()
  Role_Action.associate = (models) => {
    Role_Action.belongsTo(models.action, { as: 'action', foreignKey: "action_id" });

    Role_Action.belongsTo(models.role, { as: 'role', foreignKey: "role_id" });
  };
  return Role_Action;
};
