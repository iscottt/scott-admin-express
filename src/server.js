const express = require("express");
const bodyParser = require("body-parser");
const MyError = require("./exception");
const http = require("http");
const {
  FORBIDDEN_ERROR_CODE,
  INVALID_TOKEN_ERROR_CODE,
} = require("./exception/errorCode");
const morgan = require("morgan");
const { expressjwt: jwt } = require("express-jwt");
const secretKey = "Scott";
// 请求大小限制
const requestLimit = "5120kb";

function error(err, req, res) {
  if (err.name === "UnauthorizedError") {
    return res.send({
      retCode: INVALID_TOKEN_ERROR_CODE,
      retMessage: "token已过期",
    });
  }
  return res.send({
    retCode: 500,
    retMessage: "服务器内部错误",
  });
}

class ExpressServer {
  constructor() {
    this.app = express();
    // 上下文请求路径
    this.contextPath = "/api";
    // 请求日志
    this.app.use(morgan("short"));
    this.app.use(
      bodyParser.urlencoded({ extended: false, limit: requestLimit })
    );
    this.app.use(bodyParser.json({ limit: requestLimit }));
    this.app.set("x-powered-by", false);
    this.app.all("*", (req, res, next) => {
      // 开启跨域
      res.setHeader("Access-Control-Allow-Credentials", "true");
      const origin = req.get("Origin");
      // 允许的地址 http://127.0.0.1:9000 这样的格式
      if (origin) {
        res.setHeader("Access-Control-Allow-Origin", origin);
      }
      // 允许跨域请求的方法
      res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, GET, OPTIONS, DELETE, PUT"
      );
      // 允许跨域请求 header 携带哪些东西
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since, Authorization"
      );
      next();
    });
    // jwt
    this.app.use(
      jwt({
        secret: secretKey,
        algorithms: ["HS256"],
        credentialsRequired: true, //  false：不校验
      }).unless({
        path: [
          "/api/auth/login",
          "/api/auth/register",
          "/api/auth/refreshToken",
        ], //不需要校验的路径
      })
    );
    this.app.use(error);
    this.server = http.createServer(this.app);
  }

  setRoute(path, method, handlerFunction) {
    const handler = async (req, res) => {
      // IP 过滤
      const requestClientIp = getClientIp(req);
      if (!requestClientIp) {
        return FORBIDDEN_ERROR_CODE;
      }
      const event = Object.assign(req.body, req.params);
      let result;
      try {
        const startTime = new Date().getTime();
        let params;
        if (event.file) {
          let eventCopy = { ...event };
          eventCopy.file = undefined;
          params = JSON.stringify(eventCopy);
        } else {
          params = JSON.stringify(event);
        }
        console.log(
          `req start path = ${req.path}, clientIp = ${requestClientIp}, params = ${params}`
        );
        result = await handlerFunction(event, req, res);
        // 封装响应
        result = {
          retCode: 0,
          retData: result,
        };
        console.log(
          `req end path = ${
            req.path
          }, clientIp = ${requestClientIp}, params = ${params}, costTime = ${
            new Date().getTime() - startTime
          }`
        );
      } catch (e) {
        console.log("捕获", e);
        // 全局异常处理
        if (e instanceof MyError) {
          result = {
            retCode: e.code,
            retMessage: e.message,
            retData: null,
          };
        } else {
          result = {
            retCode: 500,
            retData: null,
            retMessage: "服务端异常",
          };
        }
        console.error(
          `req error path = ${
            req.path
          }, clientIp = ${requestClientIp}, params = ${JSON.stringify(event)}`,
          e
        );
      }
      res.send(result);
    };
    // TODO: 代码优化
    switch (method) {
      case "POST":
        this.app.post(this.contextPath + path, handler);
        break;
      case "GET":
        this.app.get(this.contextPath + path, handler);
        break;
      case "PUT":
        this.app.put(this.contextPath + path, handler);
        break;
      case "DELETE":
        this.app.delete(this.contextPath + path, handler);
        break;
      case "PATCH":
        this.app.patch(this.contextPath + path, handler);
        break;
      default:
        this.app.post(this.contextPath + path, handler);
        break;
    }
  }

  listen(port) {
    this.server.listen(port);
    let url = `http://localhost:${port}`;
    if (this.contextPath) {
      url += this.contextPath;
    }
    console.log(`============ 🍑 server start at ${url} 🎉 🎉 🎉 `);
  }
}

/**
 * 获取真实客户端 ip
 * @param req
 * @returns {*|string}
 */
function getClientIp(req) {
  if (!req) {
    return "";
  }
  return (
    req.headers["x-forwarded-for"] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    req.connection?.socket?.remoteAddress ||
    req.ip
  );
}

module.exports.CloudBaseRunServer = ExpressServer;
