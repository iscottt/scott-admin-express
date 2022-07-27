const { CloudBaseRunServer } = require("./server");
const routes = require("./routes/index");

// 创建云托管 Server 实例
const server = new CloudBaseRunServer();
// 注册接口路由 降维数组遍历setRoute
for (const route of routes.flat()) {
  server.setRoute(route.path, route.handler);
}
// 监听端口
server.listen(7345);
