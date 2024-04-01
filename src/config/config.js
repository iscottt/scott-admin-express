/**
 * 默认配置
 * @author scott studio
 */
module.exports = {
  // MySQL 配置
  // dbConfig: {
  //   database: "scott-admin",
  //   username: "root",
  //   password: "13155958652",
  //   host: "localhost",
  //   port: 3306,
  // },
  dbConfig: {
    database: "scott-admin",
    username: "scott",
    password: "scott",
    host: "62.234.131.132",
    port: 3306,
  },
  // jwt
  secretKey: "Scott",
  SALT: "coder_scott",
  defaultPassword: "123456",
  // okx.com
  appSecretKey: '218D2EA470CC4D803E8DC4DB18DDC2AB',
  
};
