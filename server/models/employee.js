/***************************************************
Title: employee.js
Author: Professor Krasso
Date: 08-20-2022
Modified By: Allan Trejo
Description: Schema file describing an employee MongoDB document
Code Attribution: https://mongoosejs.com
                  https://expressjs.com
                  https://www.mongodb.com
                  https://swagger.io

***********************************************/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const itemSchema = require("./item");

let employeeSchema = new Schema(
  {
    empId: { type: Number, unique: true, required: true },
    firstName: { type: String },
    lastName: { type: String },
    todo: [itemSchema],
    done: [itemSchema],
  },
  { collection: "employees" }
);

module.exports = mongoose.model("Employee", employeeSchema);
