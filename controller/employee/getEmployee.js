const Employee = require("../../model/Empolyee");

// READ all employees
const getAllEmployees = async (req, res) => {
  try {
    const empId = req.empId; // logged-in user id

    // find logged-in employee
    const retrievedEmp = await Employee.findById(empId);
    if (!retrievedEmp) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    // check if Employee has access
    if (!["incharge", "manager"].includes(retrievedEmp.designation)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only administrators can add employees.",
      });
    }
    const employees = await Employee.find();
    return res.status(200).json(employees);
  } catch (error) {
    console.error("❌ Server Error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// get single employee
const getSingleEmp = async (req, res) => {
  try {
    const empId = req.empId;
    const empData = await Employee.findById(empId);
    if (empData) {
      return res.status(200).json({
        success: true,
        data: empData,
        message: "retrieved employee data successfully.",
      });
    }
    return res.status(404).json({
      success: false,
      message: "employee data not found.",
    });
  } catch (error) {
    console.error("❌ Server Error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
module.exports = {getAllEmployees , getSingleEmp}
