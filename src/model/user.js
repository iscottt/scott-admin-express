const { DataTypes } = require("sequelize");
const sequelize = require("../db");

/**
 * 用户模型
 * @author yupi
 */
const UserModel = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    roleId: {
      type: DataTypes.BIGINT,
      field: "role_id",
    },
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    createTime: {
      type: DataTypes.DATE,
      field: "create_time",
    },
    updateTime: {
      type: DataTypes.DATE,
      field: "update_time",
    },
    userRole: {
      type: DataTypes.STRING,
      field: "user_role",
    },
  },
  {
    tableName: "user",
    // 软删除
    paranoid: false,
    createdAt: "createTime",
    updatedAt: "updateTime",
    // 自动添加时间戳
    timestamps: true,
  }
);

module.exports = UserModel;
