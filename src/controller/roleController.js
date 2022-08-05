const {
  pageRole,
  insertRole,
  updateRole,
  deleteRole,
  getRole,
} = require("../service/roleService");
const { REQUEST_PARAMS_ERROR_CODE } = require("../exception/errorCode");
const SError = require("../exception");

/**
 * 插入角色
 * @param event
 * @returns {Promise<string>}
 */
async function insertRoleApi(event) {
  const { roleName, menuIds } = event;
  if (!roleName || !menuIds) {
    throw new SError(REQUEST_PARAMS_ERROR_CODE, "入参错误");
  }
  return await insertRole(roleName, menuIds);
}

/**
 * 更新角色
 * @param event
 * @returns {Promise<string>}
 */
async function updateRoleApi(event) {
  const { id, roleName, menuIds, status } = event;
  if (!id) {
    throw new SError(REQUEST_PARAMS_ERROR_CODE, "入参错误");
  }
  return await updateRole(id, roleName, menuIds, status);
}

/**
 * 分页查询角色
 * @param event
 * @returns {Promise<{pagination: {current, total: number, pageSize}, rows: []}>}
 */
async function pageRoleApi(event) {
  const { pageSize = 10, current = 1, roleName, status } = event;
  return await pageRole(roleName, status, +pageSize, current);
}

/**
 * 删除角色
 * @param event
 * @returns {Promise<string>}
 */
async function deleteRoleApi(event) {
  const { id } = event;
  if (!id) {
    throw new SError(REQUEST_PARAMS_ERROR_CODE, "入参错误");
  }
  return await deleteRole(id);
}

/**
 * 根据id获取角色
 * @param event
 * @returns {Promise<*>}
 */
async function getRoleApi(event) {
  const { id } = event;
  if (!id) {
    throw new SError(REQUEST_PARAMS_ERROR_CODE, "入参错误");
  }
  return await getRole(id);
}

module.exports = {
  getRoleApi,
  insertRoleApi,
  updateRoleApi,
  pageRoleApi,
  deleteRoleApi,
};
