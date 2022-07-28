const menuController = require("./../controller/menuController");

/**
 * 接口路由
 * @author yupi
 */
const users = [
  {
    path: "/menu/getRoutes",
    method: "POST",
    handler: menuController.getRoutersApi,
  },
];

module.exports = users;
