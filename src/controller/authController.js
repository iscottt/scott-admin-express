const SError = require("../exception");
const {
  REQUEST_PARAMS_ERROR_CODE,
  NO_AUTH_ERROR_CODE,
} = require("../exception/errorCode");
const {
  userLogin,
  userRegister,
  getLoginUser,
  getRefreshToken,
} = require("../service/authService");

/**
 * 用户注册
 * @param event
 * @param req
 * @param res
 */
async function userRegisterApi(event, req, res) {
  const { username, password, email } = event;
  if (!username || !password || !email) {
    throw new SError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  const result = await userRegister(username, password, email);
  return result ? "操作成功" : "操作失败，系统异常";
}

/**
 * 用户登录
 * @param event
 * @param req
 * @param res
 */
async function userLoginApi(event, req, res) {
  const { username, password } = event;
  if (!username || !password) {
    throw new SError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return await userLogin(username, password, req);
}

/**
 * 用户注销
 * @param event
 * @param req
 * @param res
 */
function userLogoutApi(event, req, res) {
  if (!req.auth.dataValues) {
    throw new SError(NO_AUTH_ERROR_CODE, "未登录");
  }
  return true;
}

/**
 * 获取当前登录用户
 * @param event
 * @param req
 * @param res
 */
async function getLoginUserApi(event, req, res) {
  return await getLoginUser(req);
}

/**
 * 获取刷新凭证 refreshToken
 * @param event
 * @param req
 * @param res
 */
async function getRefreshTokenApi(event, req, res) {
  const { verifyToken } = event;
  if (!verifyToken) {
    throw new SError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return await getRefreshToken(verifyToken);
}

module.exports = {
  userRegisterApi,
  userLoginApi,
  getLoginUserApi,
  userLogoutApi,
  getRefreshTokenApi,
};
