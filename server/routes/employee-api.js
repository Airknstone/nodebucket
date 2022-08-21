/***************************************************
Title: employee-api.js
Author: Professor Krasso
Date: 08-20-2022
Modified By: Allan Trejo
Description: Endpoints for employee APIS
Code Attribution: https://mongoosejs.com
                  https://expressjs.com
                  https://www.mongodb.com
                  https://swagger.io

***********************************************/
/* Requirements  */
const express = require("express");
const Employee = require("../models/employee");
const router = express.Router();

/** findEmployeeById
 * @swagger
 * /api/employees/{empId}:
 *   get:
 *     tags:
 *       - Employees
 *     summary: findEmployeeById
 *     description: Get employee object by empId key
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: The ID of the employee to return
 *         schema:
 *           type: number

 *     responses:
 *       '200':
 *          description: Returned a Single Employee Document
 *       '500':
 *          description: Server Exception
 *       '501':
 *          description: MongoDB Exception
 */
router.get("/:empId", async (req, res) => {
  console.log(req);
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, emp) {
      if (err) {
        console.log(err);
        res.status(501).send({
          err: `MongoDB Server Error: ${err.message}`,
        });
      } else {
        console.log(emp);
        res.json(emp);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      Err: `${error}`,
    });
  }
});

module.exports = router;
