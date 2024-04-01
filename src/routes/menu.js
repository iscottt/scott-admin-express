const menuController = require("./../controller/menuController");

/**
 * 接口路由
 * @author scott studio
 */
const users = [
  {
    path: "/menu/getRoutes",
    method: "POST",
    handler: menuController.getRoutersApi,
  },
  {
    path: "/menu/getMenuTree",
    method: "GET",
    handler: menuController.getMenuTreeApi,
  },
];

module.exports = users;
