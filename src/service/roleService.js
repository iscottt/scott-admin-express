const {
  NOT_FOUND_ERROR_CODE,
  REQUEST_PARAMS_ERROR_CODE,
} = require("../exception/errorCode");
const RoleModel = require("../model/role");
const SError = require("../exception");
const { Op } = require("sequelize");

/**
 * 分页获取角色列表
 * @param roleName
 * @param status
 * @param pageSize
 * @param current
 * @returns {Promise<{pagination: {current, total: number, pageSize}, rows: []}>}
 */
async function pageRole(roleName, status, pageSize, current) {
  const whereOptions = {};
  // 拼装查询语句
  roleName &&
    Object.assign(whereOptions, {
      roleName: {
        [Op.like]: `%${roleName}%`,
      },
    });
  status &&
    status !== "all" &&
    Object.assign(whereOptions, {
      status,
    });
  // 按条件查询且返回总数
  const result = await RoleModel.findAndCountAll({
    where: whereOptions,
    limit: pageSize,
    offset: (current - 1) * pageSize,
    order: [["createTime", "DESC"]],
  });
  return {
    rows: result.rows,
    pagination: {
      current,
      pageSize,
      total: result.count,
    },
  };
}

async function updateRole(id, roleName, menuIds, status) {
  const updateOptions = {};
  roleName && Object.assign(updateOptions, { roleName });
  menuIds && Object.assign(updateOptions, { menuIds });
  status && Object.assign(updateOptions, { status });
  const role = await RoleModel.findByPk(id);
  if (!role) {
    throw new SError(NOT_FOUND_ERROR_CODE, "角色不存在");
  }
  await RoleModel.update(updateOptions, {
    where: {
      id,
    },
  });
  return "更新成功";
}

async function deleteRole(id) {
  await RoleModel.destroy({
    where: { id },
  });
  return "操作成功";
}

async function insertRole(roleName, menuIds) {
  const role = await RoleModel.findOne({
    where: { roleName },
  });
  if (role) {
    throw new SError(REQUEST_PARAMS_ERROR_CODE, "当前角色已存在");
  }
  await RoleModel.create({
    roleName,
    menuIds,
    status: 1,
  });
  return "操作成功";
}

async function getRole(id) {
  return await RoleModel.findByPk(id);
}

module.exports = {
  pageRole,
  updateRole,
  deleteRole,
  insertRole,
  getRole,
};
