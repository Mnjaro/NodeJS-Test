const { Pool } = require("pg");

// Configurating The connection between my server and the database
const pool = new Pool({
  user: "giyijzov",
  host: "dumbo.db.elephantsql.com",
  database: "giyijzov",
  password: "cAh_iqICwB8MtOfEiPRePDTGHSrwnx7N",
  port: 5432,
});

module.exports = pool;
