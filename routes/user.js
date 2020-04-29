const express = require("express");
const router = express.Router();
const pool = require("../config/pgConnector");

router.get("/", (req, res) => {
  pool // We're using the instance connected to the DB
    .query("SELECT * FROM users;")
    .then((data) => res.json(data)) // We can send the data as a JSON
    .catch((e) => res.sendStatus(404)); // In case of problem we send an HTTP code
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  pool // We're using the instance connected to the DB
    .query("SELECT * FROM users WHERE id=$1;", [id])
    .then((data) => res.json(data)) // We can send the data as a JSON
    .catch((e) => res.sendStatus(404)); // In case of problem we send an HTTP code
});

router.post("/", (req, res) => {
  const { first_name, last_name, age } = req.body;
  pool // We're using the instance connected to the DB
    .query(
      "INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3);",
      [first_name, last_name, age]
    )
    .then((data) => res.json(data)) // We can send the data as a JSON
    .catch((e) => res.sendStatus(404)); // In case of problem we send an HTTP code
});

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  pool // We're using the instance connected to the DB
    .query("DELETE FROM users WHERE id=$1;", [id])
    .then((data) => res.json(data)) // We can send the data as a JSON
    .catch((e) => res.status(404).json(e)); // In case of problem we send an HTTP code
});

module.exports = router;
