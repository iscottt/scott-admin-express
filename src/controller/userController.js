const SError = require("../exception");
const {
  getUserByPage,
  userInsert,
  userUpdate,
  userDelete,
  userGet,
} = require("../service/userService.js");
const { REQUEST_PARAMS_ERROR_CODE } = require("../exception/errorCode");

async function userPageApi(event) {
  // 默认查询条件为每页10条
  const { pageSize = 10, current = 1, username, status } = event;
  return await getUserByPage(username, status, +pageSize, current);
}

async function userInsertApi(event) {
  const { username, email, status, userRole } = event;
  if (!username || !email) {
    throw new SError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return await userInsert(username, email, status, userRole);
}

async function userUpdateApi(event) {
  const { id, username, email, status, userRole } = event;
  if (!id) {
    throw new SError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return await userUpdate(id, username, email, status, userRole);
}

async function userDeleteApi(event) {
  const { id } = event;
  if (!id) {
    throw new SError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return await userDelete(id);
}

async function userGetApi(event) {
  const { id } = event;
  if (!id) {
    throw new SError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return await userGet(id);
}

module.exports = {
  userPageApi,
  userGetApi,
  userInsertApi,
  userUpdateApi,
  userDeleteApi,
};
