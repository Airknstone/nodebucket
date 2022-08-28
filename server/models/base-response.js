/***************************************************
Title: base-response.js
Author: Professor Krasso
Date: 08-20-2022
Modified By: Allan Trejo
Description: customize response using response object pattern
Code Attribution: https://mongoosejs.com
                  https://expressjs.com
                  https://www.mongodb.com
                  https://swagger.io

***********************************************/
class BaseResponse {
  /* takes in 3 parameters,
  example -
  (404, 'server error', error) */
  constructor(httpCode, message, data) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }

  toObject() {
    /* returns custom properties */
    return {
      httpCode: this.httpCode,
      message: this.message,
      data: this.data,
      timestamp: new Date().toLocaleDateString(),
    };
  }
}

module.exports = BaseResponse;
