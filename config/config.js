require("dotenv").config();
module.exports = {
  development: {
    username: process.env.LOCAL_USER,
    password: process.env.LOCAL_PASS,
    database: process.env.LOCAL_NAME,
    host: process.env.LOCAL_HOST,
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
