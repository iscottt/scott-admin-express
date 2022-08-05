const { DataTypes } = require("sequelize");
const sequelize = require("../db");

/**
 * 角色模型
 * @author scott
 */
const RoleModel = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    menuIds: {
      type: DataTypes.BIGINT,
      field: "menu_ids",
    },
    // Model attributes are defined here
    roleName: {
      type: DataTypes.STRING,
      field: "role_name",
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      //  1 启用 2 禁用
      defaultValue: 1,
    },
    createTime: {
      type: DataTypes.DATE,
      field: "create_time",
    },
    updateTime: {
      type: DataTypes.DATE,
      field: "update_time",
    },
  },
  {
    tableName: "role",
    // 软删除
    paranoid: false,
    createdAt: "createTime",
    updatedAt: "updateTime",
    // 自动添加时间戳
    timestamps: true,
  }
);
module.exports = RoleModel;
