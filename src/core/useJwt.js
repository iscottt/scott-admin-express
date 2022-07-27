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
        //token过期
        if (error.name === "TokenExpiredError") {
          throw new SError(NO_AUTH_ERROR_CODE, "token已过期");
        } else if (error.name === "JsonWebTokenError") {
          //无效的token
          throw new SError(NO_AUTH_ERROR_CODE, "无效的token");
        }
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
