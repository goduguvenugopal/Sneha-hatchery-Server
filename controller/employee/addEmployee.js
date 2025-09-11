const Employee = require("../../model/Empolyee");
const jwt = require("jsonwebtoken");

// CREATE employee
const addEmployee = async (req, res) => {
  try {
    const { employeeName, employeeCode, designation, mobile , password } = req.body;
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
      password
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

// login logic checks if employee already exists then jwt token returns in res
const loginEmp = async (req, res) => {
  try {
    const { employeeCode } = req.body;
    // check if employee already exists by code
    const isEmpExist = await Employee.findOne({ employeeCode });

    // generate token if emp already exists in db
    const token = jwt.sign({ empId: isEmpExist._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "30m",
    });

    if (isEmpExist) {
      return res.status(200).json({
        success: true,
        token,
        message: "logged in successfully",
      });
    }

    return res.status(404).json({
      success: false,
      message: "Employee not found",
    });
    
  } catch (error) {
    console.error("❌ Server Error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = { addEmployee, loginEmp };
