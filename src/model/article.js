const { DataTypes } = require("sequelize");
const sequelize = require("../db");

/**
 * 用户模型
 * @author scott studio
 */
const ArticleModel = sequelize.define(
  "Article",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Model attributes are defined here
    articleType: {
      type: DataTypes.STRING,
      field: "article_type",
    },
    formUrl: {
      type: DataTypes.STRING,
      field: "form_url",
    },
    content: {
      type: DataTypes.STRING,
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
    tableName: "article",
    // 软删除
    paranoid: false,
    createdAt: "createTime",
    updatedAt: "updateTime",
    // 自动添加时间戳
    timestamps: true,
  }
);

module.exports = ArticleModel;
