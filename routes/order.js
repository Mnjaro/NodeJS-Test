const express = require("express");
const router = express.Router();
const pool = require("../config/pgConnector");

router.get("/", (req, res) => {
  pool // We're using the instance connected to the DB
    .query("SELECT * FROM orders;")
    .then((data) => res.json(data)) // We can send the data as a JSON
    .catch((e) => res.sendStatus(404)); // In case of problem we send an HTTP code
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  pool // We're using the instance connected to the DB
    .query("SELECT * FROM orders WHERE id=$1;", [id])
    .then((data) => res.json(data)) // We can send the data as a JSON
    .catch((e) => res.sendStatus(404)); // In case of problem we send an HTTP code
});

router.post("/", (req, res) => {
  const { price, date, user_id } = req.body;
  pool // We're using the instance connected to the DB
    .query("INSERT INTO orders (price, date, user_id) VALUES ($1, $2, $3);", [
      price,
      date,
      user_id,
    ])
    .then((data) => {
      if (data.rowCount === 1) res.send("Correctly Inserted");
      else res.send("Not Successfull");
    }) // We can send the data as a JSON
    .catch((e) => res.sendStatus(404)); // In case of problem we send an HTTP code
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { price } = req.body;
  pool // We're using the instance connected to the DB
    .query("UPDATE orders SET price=$1 WHERE id=$2 RETURNING *;", [price, id])
    .then((data) => res.json(data)) // We can send the data as a JSON
    .catch((e) => res.sendStatus(404)); // In case of problem we send an HTTP code
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  pool // We're using the instance connected to the DB
    .query("DELETE FROM orders WHERE id=$1;", [id])
    .then((data) => res.json(data)) // We can send the data as a JSON
    .catch((e) => res.status(404).json(e)); // In case of problem we send an HTTP code
});
