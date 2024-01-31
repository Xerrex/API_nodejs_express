const express = require("express");
const EmployeeController = require("../../controllers/employeeController");

const router = express.Router();


router.route("/")
.get(EmployeeController.getAllEmployees)
.post(EmployeeController.createEmployee)
.put(EmployeeController.updateEmployee)
.delete(EmployeeController.deleteEmployee)


router.route("/:id").get(EmployeeController.getEmployee)


module.exports = router;