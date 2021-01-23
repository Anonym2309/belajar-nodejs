var mysql = require("mysql");

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbrestapi",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Mysql Terkoneksi");
});

module.exports = conn;
