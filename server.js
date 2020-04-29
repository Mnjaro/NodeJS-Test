// node_modules
const express = require("express");
const bodyParser = require("body-parser");

// Routes
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");

const app = express();
const port = 3000;

// Body Parser setup for Form
app.use(bodyParser.urlencoded());

// Route Setup
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);

// Start of the server
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
