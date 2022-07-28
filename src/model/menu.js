const { DataTypes } = require("sequelize");
const sequelize = require("../db");

/**
 * 用户模型
 * @author yupi
 */
const MenuModel = sequelize.define(
  "Menu",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    parentId: {
      type: DataTypes.BIGINT,
      field: "parent_id",
    },
    // Model attributes are defined here
    menuName: {
      type: DataTypes.STRING,
      field: "menu_name",
      allowNull: false,
    },
    menuUrl: {
      type: DataTypes.STRING,
      field: "menu_url",
      allowNull: false,
    },
    menuComponent: {
      type: DataTypes.STRING,
      field: "menu_component",
    },
    menuSort: {
      type: DataTypes.INTEGER,
      field: "menu_sort",
    },
    menuIcon: {
      type: DataTypes.STRING,
      field: "menu_icon",
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
  },
  {
    tableName: "menu",
    // 软删除
    paranoid: false,
    createdAt: "createTime",
    updatedAt: "updateTime",
    // 自动添加时间戳
    timestamps: true,
  }
);

module.exports = MenuModel;
