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

app.get("/", (req, res) => {
  pool // We're using the instance connected to the DB
    .query("SELECT * FROM users;")
    .then((data) => res.json(data)) // We can send the data as a JSON
    .catch((e) => res.sendStatus(404)); // In case of problem we send an HTTP code
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
