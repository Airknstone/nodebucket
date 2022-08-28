/***************************************************
Title: item.js
Author: Professor Krasso
Date: 08-20-2022
Modified By: Allan Trejo
Description: Schema file describing an item object for todo and done
Code Attribution: https://mongoosejs.com
                  https://expressjs.com
                  https://www.mongodb.com
                  https://swagger.io

***********************************************/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let itemSchema = new Schema({
  text: { type: String },
});

module.exports = itemSchema;
