const MenuModel = require("../model/menu");
const generatorMenus = require("../core/useGeneratorMenu");
const generatorTree = require("../core/useGeneratorTree");
const { verToken } = require("../core/useJwt");
const RoleModel = require("../model/role");
const { Op } = require("sequelize");
const findNoParentItem = require("../core/useFindNoParent");

/**
 * 获取动态菜单
 * @param req
 * @return {Promise<{routes: *, home: string}>}
 */
async function getDynamicRouters(req) {
  const token = req.headers.authorization.split("Bearer ")[1];
  // 验证token是否有效
  const verifyResult = await verToken(token);
  // 拿到token中的用户信息
  const { dataValues } = verifyResult;
  const userInfo = dataValues || verifyResult;
  // 获取roleIds
  const roleIds = userInfo.roleIds;
  const roleInfo = await RoleModel.findByPk(roleIds);
  // 获取角色对应的menuIds
  const menuIds = roleInfo.dataValues.menuIds.split(",").map((id) => +id);
  // 根据menuIds获取到菜单信息
  const routes = await MenuModel.findAll({
    where: {
      [Op.or]: [{ id: menuIds }],
    },
  });
  // 没有父节点id时获取父节点信息
  const noParentId = findNoParentItem(routes)[0].dataValues.parentId;
  const noParentItem = await MenuModel.findByPk(+noParentId);
  routes.push(noParentItem);
  return generatorMenus(routes);
}

async function getDynamicTree() {
  const routes = await MenuModel.findAll();
  return generatorTree(routes);
}

module.exports = {
  getDynamicRouters,
  getDynamicTree,
};
