"use strict";

module.exports = (app) => {
  const { INTEGER, DATE } = app.Sequelize;

  const MenuRole = app.model.define(
    "menu_role",
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true }, // 主键，自增
      users_id: { type: INTEGER },
      role_id: { type: INTEGER },
      created_at: DATE,
      updated_at: DATE,
    },
    {
      freezeTableName: true,
    }
  );

  MenuRole.associate = function () {
    // 用belongsToMany指定多对多关联关系，并指定外键
    app.model.User.belongsToMany(app.model.Role, {
      through: MenuRole,
      foreignKey: "users_id",
      otherKey: "role_id",
    });
    app.model.Role.belongsToMany(app.model.User, {
      through: MenuRole,
      foreignKey: "role_id",
      otherKey: "users_id",
    });
  };

  return MenuRole;
};
