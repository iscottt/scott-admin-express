const SError = require("../exception");
const { REQUEST_PARAMS_ERROR_CODE } = require("../exception/errorCode");
const useVerifyUser = (username, password, email, needPassword) => {
  // 校验
  if (!username || (!password && needPassword) || !email) {
    throw new SError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  if (username > 10) {
    throw new SError(REQUEST_PARAMS_ERROR_CODE, "用户名过长");
  }
  const regEmail =
    /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (!regEmail.test(email)) {
    throw new SError(REQUEST_PARAMS_ERROR_CODE, "邮箱地址不合法");
  }
};

module.exports = useVerifyUser;
