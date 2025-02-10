const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "cancer",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

module.exports = pool;
