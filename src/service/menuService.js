const { NOT_FOUND_ERROR_CODE } = require("../exception/errorCode");
const MenuModel = require("../model/menu");
const SError = require("../exception");
const generatorMenus = require("../core/useGeneratorMenu");

/**
 * 获取动态菜单
 * @param req
 * @return {Promise<{routes: *, home: string}>}
 */
async function getDynamicRouters(req) {
  const routes = await MenuModel.findAll();
  if (!routes) {
    throw new SError(NOT_FOUND_ERROR_CODE, "找不到菜单");
  }
  return generatorMenus(routes);
}

module.exports = {
  getDynamicRouters,
};
