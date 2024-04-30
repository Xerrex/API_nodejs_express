const express = require("express");
const EmployeeController = require("../../controllers/employeeController");
const ROLES_LIST = require("../../config/rolesList");
const verifyRoles = require("../../middleware/verifyRoles");

const router = express.Router();


router.route("/")
.get(EmployeeController.getAllEmployees)
.post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), EmployeeController.createEmployee)
.put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), EmployeeController.updateEmployee)
.delete(verifyRoles(ROLES_LIST.Admin), EmployeeController.deleteEmployee)


router.route("/:id").get(EmployeeController.getEmployee)


module.exports = router;