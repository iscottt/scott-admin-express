const userController = require('../controller/userController')

/**
 * 接口路由
 * @author yupi
 */
const users = [
  {
    path: "/user/register",
    handler: userController.userRegisterApi,
  },
  {
    path: "/user/login",
    handler: userController.userLoginApi,
  },
  {
    path: "/user/logout",
    handler: userController.userLogoutApi,
  }
];

module.exports = users;
