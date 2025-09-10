const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/middleware");
const { addEmployee, loginEmp } = require("../controller/employee/addEmployee");
const {
  getSingleEmp,
  getAllEmployees,
} = require("../controller/employee/getEmployee");
const updateEmployee = require("../controller/employee/updateEmployee")
const deleteEmployee = require("../controller/employee/deleteEmployee");

// routes and method
router.post("/login/employee", loginEmp);
router.post("/add/employee", verifyToken, addEmployee);
router.get("/get/single/employee", verifyToken, getSingleEmp);
router.get("/get/all/employees", verifyToken, getAllEmployees);
router.put("/update/single/employee/:id", verifyToken, updateEmployee );
router.delete("/delete/single/employee/:id", verifyToken, deleteEmployee);

// export router
module.exports = router;

