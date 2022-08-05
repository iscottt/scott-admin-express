/**
 * 生成tree数据
 * @param items
 * @param parentId
 * @returns {*}
 */
const generatorTree = (items, parentId = 0) => {
  return items
    .filter((item) => item.parentId === parentId)
    .sort((a, b) => a.menuSort - b.menuSort)
    .map((item) => {
      const { id, menuName } = item;
      return {
        // 路由名称，建议唯一
        title: menuName || "",
        children: generatorTree(items, item.id),
        key: id,
        parentId,
      };
    });
};
module.exports = generatorTree;
