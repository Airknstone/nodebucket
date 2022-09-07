/***************************************************
Title: index.js
Author: Professor Krasso
Date: 08-20-2022
Modified By: Allan Trejo
Description: Root Server File
Code Attribution: https://mongoosejs.com
                  https://expressjs.com
                  https://www.mongodb.com
                  https://swagger.io

***********************************************/
/**
 * Require statements
 */
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express(); // Express variable.
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const EmployeeAPI = require("./routes/employee-api");
const logger = require("morgan");
/**
 * App configurations.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../dist/nodebucket")));
app.use("/", express.static(path.join(__dirname, "../dist/nodebucket")));

// default server port value.
const PORT = process.env.PORT || 3000;
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

/* object that defines options for Swagger operations */
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Web 450 NodeBucket",
      version: "1.0.0",
    },
  },
  apis: ["./server/routes/employee-api.js"],
};

/* This library reads your JSDoc-annotated source code and generates an OpenAPI (Swagger) specification. */
const openapiSpecification = swaggerJsdoc(options);

/* Configure express to use /api-docs route to serve swaggerJsdoc  */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use("/api/employees", EmployeeAPI);
/* redirect if path is modified before hashtag */
app.use("/*", function (req, res, next) {
  res.redirect("/");
  next();
});
// Wire-up the Express server.
app.listen(PORT, () => {
  console.log("Application started and listening on PORT: " + PORT);
});
