const Employee = require("../../model/Empolyee");

// CREATE employee
const saveEmployee = async (req, res) => {
  try {
    const { employeeName, employeeCode, designation, mobile } = req.body;
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

    // check if employee already exists by code
    const isEmpExist = await Employee.findOne({ employeeCode });
    if (isEmpExist) {
      return res.status(409).json({
        success: false,
        message: "Employee already exists with this employee code",
      });
    }

    // create new employee object
    const newEmployee = new Employee({
      employeeName,
      employeeCode,
      designation,
      mobile,
    });

    // save employee
    await newEmployee.save();

    return res.status(201).json({
      success: true,
      message: "Employee saved successfully",
    });
  } catch (error) {
    console.error("❌ Server Error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = saveEmployee