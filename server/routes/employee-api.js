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
const BaseResponse = require("../models/base-response");
const { response } = require("express");

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
        const mongoResponse = new BaseResponse(
          501,
          "MongoDB Server Error!",
          err
        );
        console.log(mongoResponse.toObject());
        res.status(501).send(mongoResponse.toObject());
      } else {
        if (emp) {
          const findEmployeeByIdResponse = new BaseResponse(
            200,
            "Query Successful!",
            emp
          );
          console.log(findEmployeeByIdResponse.toObject());
          res.json(findEmployeeByIdResponse.toObject());
        } else {
          const notFoundEmployeeResponse = new BaseResponse(
            200,
            "Invalid Employee ID. Please Try Again!",
            null
          );
          console.log(notFoundEmployeeResponse.toObject());
          res.json(notFoundEmployeeResponse.toObject());
        }
      }
    });
  } catch (error) {
    const errorResponse = new BaseResponse(500, "Internal Server Error", error);
    console.log(errorResponse.toObject());
    res.status(500).send(errorResponse.toObject());
  }
});

/**
 * createTask
 * **********************/
router.post("/:empId/tasks", async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, emp) {
      if (err) {
        console.log(err);
        res.status(501).send({
          err: `MongoDB Server Error ${err.message}`,
        });
      } else {
        console.log(emp);
        const newTask = {
          text: req.body.text,
        };
        emp.todo.push(newTask);

        emp.save(function (err, updatedEmp) {
          if (err) {
            console.log(err);
            response.status(501).send({
              err: `MongoDB Server Error ${err.message}`,
            });
          } else {
            console.log(updatedEmp);
            res.json(updatedEmp);
          }
        });
      }
    });
  } catch (error) {
    const errorResponse = new BaseResponse(500, "Internal Server Error", error);
    console.log(errorResponse.toObject());
    res.status(500).send(errorResponse.toObject());
  }
});

/**
 * findAllTasks
 * **********************/
router.get("/:empId/tasks", async (req, res) => {
  try {
    Employee.findOne(
      { empId: req.params.empId },
      "empId todo done",
      function (err, emp) {
        if (err) {
          console.log(err);
          res.status(501).send({
            err: `MongoDB Server Error ${err.message}`,
          });
        } else {
          console.log(emp);
          res.json(emp);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({
      err: `Internal Server Error ${error.message}`,
    });
  }
});

module.exports = router;
