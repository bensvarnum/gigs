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
    username: process.env.PROD_USER,
    password: process.env.PROD_PASS,
    database: process.env.PROD_NAME,
    host: process.env.PROD_HOST,
    dialect: "postgres",
    "protocol": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  },
};
