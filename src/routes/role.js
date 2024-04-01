const roleController = require("../controller/roleController");

/**
 * 接口路由
 * @author scott studio
 */
const role = [
  {
    path: "/role/page",
    method: "POST",
    handler: roleController.pageRoleApi,
  },
  {
    path: "/role/insert",
    method: "POST",
    handler: roleController.insertRoleApi,
  },
  {
    path: "/role/update",
    method: "PUT",
    handler: roleController.updateRoleApi,
  },
  {
    path: "/role/delete/:id",
    method: "DELETE",
    handler: roleController.deleteRoleApi,
  },
  {
    path: "/role/get/:id",
    method: "GET",
    handler: roleController.getRoleApi,
  },
];

module.exports = role;
