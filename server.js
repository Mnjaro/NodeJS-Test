const express = require("express");
const app = express();
const { Pool } = require("pg");
const port = 3000;

// Configurating The connection between my server and the database
const pool = new Pool({
  user: "giyijzov",
  host: "dumbo.db.elephantsql.com",
  database: "giyijzov",
  password: "cAh_iqICwB8MtOfEiPRePDTGHSrwnx7N",
  port: 5432,
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
