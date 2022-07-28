const { getDynamicRouters } = require("../service/menuService");

/**
 * 用户注册
 * @param event
 * @param req
 * @param res
 */
async function getRoutersApi(event, req, res) {
  return await getDynamicRouters(req);
}

module.exports = {
  getRoutersApi,
};
