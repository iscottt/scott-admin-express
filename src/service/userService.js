const { Op } = require("sequelize");

const {
  REQUEST_PARAMS_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  NO_AUTH_ERROR_CODE,
} = require("../exception/errorCode");
const UserModel = require("../model/user");
const md5 = require("md5");
const SError = require("../exception");
const { createToken, verToken } = require("../core/useJwt");

// 密码加盐
const SALT = "coder_scott";

/**
 * 获取当前登录用户
 * @param req
 * @return {Promise<User>}
 */
async function getLoginUser(req) {
  const { dataValues } = req.auth;
  // 获取当前登录用户
  const userInfo = dataValues || req.auth;
  const currentUser = await UserModel.findByPk(userInfo.id);
  // 检查用户是否合法
  if (!currentUser) {
    throw new SError(NOT_FOUND_ERROR_CODE, "找不到该用户");
  }
  return userInfo;
}

async function getRefreshToken(verifyToken) {
  // 验证token是否有效
  const verifyResult = await verToken(verifyToken);
  // 拿到token中的用户信息
  const { dataValues } = verifyResult;
  const userInfo = dataValues || verifyResult;
  // 去除无用字段。防止jwt报错
  if (userInfo.exp) {
    delete userInfo.exp;
    delete userInfo.iat;
  }
  // 如果没有找到用户，则重新登陆
  if (!userInfo) {
    throw new SError(NO_AUTH_ERROR_CODE, "token已过期");
  }
  // 创建新的token返回给用户
  const token = createToken(userInfo, "0.5h");
  const refreshToken = createToken(userInfo, "2h");
  return {
    token,
    refreshToken,
  };
}

/**
 * 用户注册
 * @param username
 * @param password
 * @param email
 * @return {Promise<boolean>}
 */
async function userRegister(username, password, email) {
  // 校验
  if (!username || !password || !email) {
    throw new SError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  if (username > 10) {
    throw new SError(REQUEST_PARAMS_ERROR_CODE, "用户名过长");
  }
  const regEmail =
    /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (!regEmail.test(email)) {
    throw new SError(REQUEST_PARAMS_ERROR_CODE, "邮箱地址不合法");
  }
  // 用户是否已存在
  let user = await UserModel.findOne({
    where: {
      // Op.or 表示查询或条件
      [Op.or]: [{ username }, { email }],
    },
  });
  if (user) {
    throw new SError(REQUEST_PARAMS_ERROR_CODE, "该用户名或邮箱已被注册");
  }
  // 插入新用户
  const cryptoPassword = md5(password + SALT);
  user = await UserModel.create({
    username,
    password: cryptoPassword,
    email,
    // 默认角色为访客
    userRole: "visitor",
  });
  return user;
}

/**
 * 用户登录
 * @param username
 * @param password
 * @param req
 * @return {Promise<null|*>}
 */
async function userLogin(username, password, req) {
  // 校验
  if (!username || !password) {
    throw new SError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  const cryptoPassword = md5(password + SALT);
  // 用户是否已存在
  let user = await UserModel.findOne({
    attributes: { exclude: ["password"] },
    where: {
      username,
      password: cryptoPassword,
    },
  });
  if (!user) {
    throw new SError(NOT_FOUND_ERROR_CODE, "用户不存在或密码错误");
  }
  // 半小时超时时间
  const token = createToken(user, "0.5h");
  // 刷新token2小时超时时间
  const refreshToken = createToken(user, "2h");
  // 登录成功
  return {
    token,
    refreshToken,
  };
}

module.exports = {
  userRegister,
  userLogin,
  getLoginUser,
  getRefreshToken,
};
