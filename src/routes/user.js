const userController = require("../controller/userController");

/**
 * 接口路由
 * @author scott studio
 */
const auth = [
  {
    path: "/user/page",
    method: "POST",
    handler: userController.userPageApi,
  },
  {
    path: "/user/insert",
    method: "POST",
    handler: userController.userInsertApi,
  },
  {
    path: "/user/update",
    method: "PUT",
    handler: userController.userUpdateApi,
  },
  {
    path: "/user/delete/:id",
    method: "DELETE",
    handler: userController.userDeleteApi,
  },
  {
    path: "/user/get/:id",
    method: "GET",
    handler: userController.userGetApi,
  },
];

module.exports = auth;
