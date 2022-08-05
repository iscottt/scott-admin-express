const { getDynamicRouters, getDynamicTree } = require("../service/menuService");

/**
 * 获取菜单
 * @param event
 * @param req
 * @param res
 */
async function getRoutersApi(event, req, res) {
  return await getDynamicRouters(req);
}

/**
 * 获取菜单树
 * @param event
 * @param req
 * @param res
 * @returns {Promise<{routes: *, home: string}>}
 */
async function getMenuTreeApi(event, req, res) {
  return await getDynamicTree(req);
}

module.exports = {
  getRoutersApi,
  getMenuTreeApi,
};
