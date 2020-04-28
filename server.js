const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded());

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

app.get("/:id", (req, res) => {
  const { id } = req.params;
  pool // We're using the instance connected to the DB
    .query("SELECT * FROM users WHERE id=$1;", [id])
    .then((data) => res.json(data)) // We can send the data as a JSON
    .catch((e) => res.sendStatus(404)); // In case of problem we send an HTTP code
});

app.post("/", (req, res) => {
  const { first_name, last_name, age } = req.body;
  pool // We're using the instance connected to the DB
    .query(
      "INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3);",
      [first_name, last_name, age]
    )
    .then((data) => res.json(data)) // We can send the data as a JSON
    .catch((e) => res.sendStatus(404)); // In case of problem we send an HTTP code
});

app.put("/:id", (req, res) => {
  const { id } = req.params;
  const { last_name } = req.body;
  pool // We're using the instance connected to the DB
    .query("UPDATE users SET last_name=$1 WHERE id=$2 RETURNING *;", [
      last_name,
      id,
    ])
    .then((data) => res.json(data)) // We can send the data as a JSON
    .catch((e) => res.sendStatus(404)); // In case of problem we send an HTTP code
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;
  pool // We're using the instance connected to the DB
    .query("DELETE FROM users WHERE id=$1;", [id])
    .then((data) => res.json(data)) // We can send the data as a JSON
    .catch((e) => res.status(404).json(e)); // In case of problem we send an HTTP code
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
