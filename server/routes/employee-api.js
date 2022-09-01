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
/**
 * createTask
 * @swagger
 * /api/employees/{empId}/tasks:
 *   post:
 *     tags:
 *       - Employees
 *     description: Finds employee by Id and adds Item object to Todo Array
 *     summary: Finds employee and posts item object to ToDO array
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: employee id - empId
 *         schema:
 *           type: number
 *     requestBody:
 *       description: 1 Parameter posts as string
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *
 *
 *     responses:
 *       '200':
 *         description: Successful Post
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB exception
 * */
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
/**
 * findAllTasks
 * @swagger
 * /api/employees/{empId}/tasks:
 *   get:
 *     tags:
 *       - Employees
 *     description:  Gets all tasks by searching empId and returns todo array
 *     summary: returns all tasks by empId
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: empId is a number associated with the user, returns all tasks by empId
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: Returned all Tasks
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB exception
 */
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

/* updateTaskAPI */
/**
 * updateTask
 * @swagger
 * /api/employees/{empId}/tasks:
 *   put:
 *     tags:
 *       - Employees
 *     description: Finds employee by Id and modifies todo and done arrays
 *     summary: Finds employee and updates items in todo and done arrays
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: employee id - empId
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       description: 2 Parameter todo and done
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               todo:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *               done:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *
 *
 *     responses:
 *       '200':
 *         description: Successful Post
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB exception
 * */
router.put("/:empId/tasks", async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, emp) {
      if (err) {
        const updateTasksMongoDbError = new BaseResponse(
          501,
          "MongoDB Server Error",
          err
        );
        console.log(updateTasksMongoDbError.toObject());
        res.status(501).send(updateTasksMongoDbError.toObject());
      } else {
        /* if no error, update employee tasks by setting new
        todo and done array of objects using params */
        console.log(emp);

        emp.set({
          todo: req.body.todo,
          done: req.body.done,
        });

        emp.save(function (err, updatedEmp) {
          if (err) {
            const updatedEmpMongoError = new BaseResponse(
              501,
              "MongoDB Server Error",
              err
            );
            console.log(updatedEmpMongoError.toObject());
            res.status(501).send(updatedEmpMongoError.toObject());
          } else {
            const updatedEmpResponse = new BaseResponse(
              200,
              "Query Successful",
              updatedEmp
            );
            console.log(updatedEmpResponse.toObject());
            res.status(200).send(updatedEmpResponse.toObject());
          }
        });
      }
    });
  } catch (error) {
    const updateTaskCatchError = new BaseResponse(
      500,
      "Internal Server Error",
      error
    );
    console.log(updateTaskCatchError.toObject());
    res.status(500).send(updateTaskCatchError.toObject());
  }
});

/* Delete Task */
/**
 * deleteTask
 * @swagger
 * /api/employees/{empId}/tasks/{taskId}:
 *   delete:
 *     tags:
 *       - Employees
 *     description:  Gets all tasks by searching empId and returns todo array
 *     summary: returns all tasks by empId
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: empId is a number associated with the user, returns all tasks by empId
 *         schema:
 *           type: number
 *       - name: taskId
 *         in: path
 *         required: true
 *         description: empId is a number associated with the user, returns all tasks by empId
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Task Deleted
 *       '300':
 *         description: Invalid Task Id
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB exception
 */
router.delete("/:empId/tasks/:taskId", async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, emp) {
      /* Handle error */
      if (err) {
        const deleteTaskMongoResponse = new BaseResponse(
          501,
          "MongoDB Server Error",
          err
        );
        console.log(deleteTaskMongoResponse.toObject());
        res.status(501).send(deleteTaskMongoResponse.toObject());
      } else {
        /* if no error search todo and done arrays for item to delete */
        console.log(emp);
        const taskId = req.params.taskId;
        const todoItem = emp.todo.find(
          (item) => item._id.toString() === taskId
        );
        const doneItem = emp.done.find(
          (item) => item._id.toString() === taskId
        );

        /* If the item is inside todo array, delete from array
          and update database */
        if (todoItem) {
          emp.todo.id(todoItem._id).remove();
          emp.save(function (err, updatedTodoItemEmp) {
            if (err) {
              const updatedTodoItemErrResponse = new BaseResponse(
                501,
                "MongoDB Server Error",
                err
              );
              console.log(updatedTodoItemErrResponse.toObject());
              res.status(501).send(updatedTodoItemErrResponse.toObject());
            } else {
              const updatedTodoItemSuccess = new BaseResponse(
                200,
                "Query Successful",
                updatedTodoItemEmp
              );
              console.log(updatedTodoItemSuccess.toObject());
              res.status(200).send(updatedTodoItemSuccess.toObject());
            }
          });
          /* If item is in done array, delete from array and update database */
        } else if (doneItem) {
          emp.done.id(todoItem._id).remove();

          emp.save(function (err, updatedTodoItemEmp) {
            if (err) {
              const updatedDoneItemErrResponse = new BaseResponse(
                501,
                "MongoDB Server Error",
                err
              );
              console.log(updatedDoneItemErrResponse.toObject());
              res.status(501).send(updatedDoneItemErrResponse.toObject());
            } else {
              const updatedDoneItemSuccess = new BaseResponse(
                200,
                "Query Successful",
                updatedTodoItemEmp
              );
              console.log(updatedDoneItemSuccess.toObject());
              res.status(200).send(updatedDoneItemSuccess.toObject());
            }
          });
          /* Invalid or not found in either arrays */
        } else {
          const invalidTaskIdResponse = new BaseResponse(
            300,
            "Invalid TaskId",
            taskId
          );
          console.log(invalidTaskIdResponse.toObject());
          res.status(300).send(invalidTaskIdResponse.toObject());
        }
      }
    });
  } catch (error) {
    const deleteTaskErrorResponse = new BaseResponse(
      500,
      "Internal Server Error",
      error
    );
    console.log(deleteTaskErrorResponse.toObject());
    res.status(500).send(deleteTaskErrorResponse.toObject());
  }
});

module.exports = router;
