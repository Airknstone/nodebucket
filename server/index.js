/**
 * Require statements
 */
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const EmployeeAPI = require("./routes/employee-api");
const app = express(); // Express variable.
const logger = require("morgan");
/**
 * App configurations.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../dist/nodebucket")));
app.use("/", express.static(path.join(__dirname, "../dist/nodebucket")));

// default server port value.
const PORT = 3000 || process.env.PORT;
app.use(logger("short"));
// Connection to database
const CONN =
  "mongodb+srv://nodebucket_user:sparta@ems.a7w7c.mongodb.net/nodebucket?retryWrites=true&w=majority";

/**
 * Database connection.
 */
mongoose
  .connect(CONN)
  .then(() => {
    console.log("Connection to the database was successful");
  })
  .catch((err) => {
    console.log("MongoDB Error: " + err.message);
  });

app.use("/api/employees", EmployeeAPI);
// Wire-up the Express server.
app.listen(PORT, () => {
  console.log("Application started and listening on PORT: " + PORT);
});
