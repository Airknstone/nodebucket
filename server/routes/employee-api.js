const express = require("express");
const Employee = require("../models/employee");

const router = express.Router();

/*
 * APIS go Here
 */

/* findEmployeeById
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
