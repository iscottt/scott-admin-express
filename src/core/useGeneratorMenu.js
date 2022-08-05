const generatorMenus = (routes) => {
  const result = list2tree(routes);
  return {
    home: "dashboard_analysis",
    routes: result,
  };
};
/**
 * 重构url
 * @param path
 * @param pathPrefix
 * @returns {string}
 */
const generatorUrl = (path, pathPrefix) => {
  let generateUrl = path.startsWith("/") ? path : "/" + path;
  generateUrl = path.startsWith(pathPrefix)
    ? generateUrl
    : pathPrefix + generateUrl;
  generateUrl = [...new Set(generateUrl.split("/"))].join("/");
  return generateUrl;
};
/**
 * 重构name
 * @param name
 * @returns {*}
 */
const generatorName = (name) => {
  const removePrefix = name.replace(/^\//g, "");
  return removePrefix.replace(/\//g, "_");
};
/**
 * 异步生成菜单树
 * @param items
 * @param parentId
 * @param arr
 * @param pathPrefix
 */
const list2tree = (items, parentId = 0, arr = [], pathPrefix = "") => {
  return items
    .filter((item) => item.parentId === parentId)
    .sort((a, b) => a.menuSort - b.menuSort)
    .map((item) => {
      const { menuIcon, menuName, menuSort, menuUrl, menuComponent } = item;
      // 重构url
      const path = generatorUrl(menuUrl, pathPrefix);
      return {
        path,
        // 路由名称，建议唯一
        name: generatorName(path) || "",
        children: list2tree(items, item.id, [], menuUrl),
        // 该路由对应页面的 组件 (动态加载)
        component: menuComponent,
        // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
        meta: {
          title: menuName,
          icon: menuIcon,
          order: menuSort,
        },
      };
    });
};

module.exports = generatorMenus;
