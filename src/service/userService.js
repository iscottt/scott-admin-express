const { Op } = require("sequelize");
const {
  NOT_FOUND_ERROR_CODE,
  REQUEST_PARAMS_ERROR_CODE,
} = require("../exception/errorCode");
const SError = require("../exception");
const UserModel = require("../model/user");
const useVerifyUser = require("../core/useVerifyUser");
const md5 = require("md5");
const { SALT, defaultPassword } = require("../config/getConfig");

/**
 * 分页查询用户
 * @param username
 * @param status
 * @param pageSize
 * @param current
 * @returns {Promise<{[p: string]: *}>}
 */
async function getUserByPage(username, status, pageSize, current) {
  const whereOptions = {};
  // 拼装查询语句
  username &&
    Object.assign(whereOptions, {
      username: {
        [Op.like]: `%${username}%`,
      },
    });

  status &&
    status !== "all" &&
    Object.assign(whereOptions, {
      status,
    });
  // 按条件查询且返回总数
  const result = await UserModel.findAndCountAll({
    where: whereOptions,
    attributes: { exclude: ["password"] },
    // limit 必须是number类型
    limit: pageSize,
    offset: (current - 1) * pageSize,
    order: [["createTime", "DESC"]],
  });
  return {
    rows: result.rows,
    pagination: {
      current,
      pageSize,
      total: result.count,
    },
  };
}

/**
 * 插入用户
 * @param username
 * @param email
 * @param status
 * @param roleIds
 * @returns {Promise<string>}
 */
async function userInsert(username, email, status, roleIds) {
  // 表单验证
  useVerifyUser(username, "", email, false);
  // 用户是否已存在
  let user = await UserModel.findOne({
    where: {
      [Op.or]: [{ username }, { email }],
    },
  });
  if (user) {
    throw new SError(REQUEST_PARAMS_ERROR_CODE, "该用户名或邮箱已存在");
  }
  // 创建默认密码
  const cryptoPassword = md5(defaultPassword + SALT);
  // 插入新用户
  await UserModel.create({
    username,
    email,
    password: cryptoPassword,
    roleIds,
    status: 1,
  });
  return "操作成功";
}

/**
 * 更新用户
 * @param id
 * @param username
 * @param email
 * @param status
 * @param roleIds
 * @returns {Promise<string>}
 */
async function userUpdate(id, username, email, status, roleIds) {
  const updateOptions = {};
  username && Object.assign(updateOptions, { username });
  email && Object.assign(updateOptions, { email });
  status && Object.assign(updateOptions, { status });
  roleIds && Object.assign(updateOptions, { roleIds });
  const user = await UserModel.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  if (!user) {
    throw new SError(NOT_FOUND_ERROR_CODE, "用户不存在");
  }
  await UserModel.update(updateOptions, {
    where: {
      id,
    },
  });
  return "更新成功";
}

/**
 * 删除指定用户
 * @param id
 * @returns {Promise<string>}
 */
async function userDelete(id) {
  await UserModel.destroy({
    where: { id },
  });
  return "删除成功";
}

async function userGet(id) {
  const user = UserModel.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  if (!user) {
    throw new SError(NOT_FOUND_ERROR_CODE, "用户不存在");
  }
  return user;
}
module.exports = {
  getUserByPage,
  userInsert,
  userUpdate,
  userDelete,
  userGet,
};
