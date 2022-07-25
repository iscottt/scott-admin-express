const SError = require("../exception");
const {
    REQUEST_PARAMS_ERROR_CODE,
    NO_AUTH_ERROR_CODE,
} = require("../exception/errorCode");
// const {
//     userLogin,
//     userRegister,
//     getLoginUser,
// } = require("../service/userService");

/**
 * 用户注册
 * @param event
 * @param req
 * @param res
 */
async function userRegisterApi(event, req, res) {
    return '用户注册'
}

/**
 * 用户登录
 * @param event
 * @param req
 * @param res
 */
async function userLoginApi(event, req, res) {
    return '用户登录'
}

/**
 * 用户注销
 * @param event
 * @param req
 * @param res
 */
function userLogoutApi(event, req, res) {
    return '用户注销登录';
}

/**
 * 获取当前登录用户
 * @param event
 * @param req
 * @param res
 */
async function getLoginUserApi(event, req, res) {
    return '用户信息'
}

module.exports = {
    userRegisterApi,
    userLoginApi,
    getLoginUserApi,
    userLogoutApi,
};
