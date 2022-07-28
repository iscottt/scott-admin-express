const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/getConfig");
const { NO_AUTH_ERROR_CODE } = require("../exception/errorCode");
const SError = require("../exception");

// 生成token
const createToken = function (data, expiresIn) {
  return jwt.sign(
    {
      ...data,
    },
    secretKey,
    { expiresIn }
  );
};

//验证token
const verToken = function (token) {
  return new Promise((resolve) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        console.log("token error", error);
        throw new SError(NO_AUTH_ERROR_CODE, "token已过期");
      }
      resolve(decoded);
    });
  });
};

module.exports = {
  secretKey,
  createToken,
  verToken,
};
