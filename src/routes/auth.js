const authController = require("../controller/authController");

/**
 * 接口路由
 * @author scott studio
 */
const auth = [
  {
    path: "/auth/register",
    method: "POST",
    handler: authController.userRegisterApi,
  },
  {
    path: "/auth/login",
    method: "POST",
    handler: authController.userLoginApi,
  },
  {
    path: "/auth/logout",
    method: "POST",
    handler: authController.userLogoutApi,
  },
  {
    path: "/auth/getLoginUser",
    method: "GET",
    handler: authController.getLoginUserApi,
  },
  {
    path: "/auth/refreshToken",
    method: "POST",
    handler: authController.getRefreshTokenApi,
  },
];

module.exports = auth;
