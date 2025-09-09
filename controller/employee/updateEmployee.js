const Employee = require("../../model/Empolyee");

// UPDATE employee
const updateEmployee = async (req, res) => {
  try {
    const empId = req.empId;
    const { id } = req.params;
    const employeeData = req.body;

    const retrievedEmp = await Employee.findById(empId);
    if (!retrievedEmp) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    if (!["incharge", "manager"].includes(retrievedEmp.designation)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only administrators can update employees.",
      });
    }

    const updatedEmp = await Employee.findByIdAndUpdate(id, employeeData, {
      new: true,
      runValidators: true,
    });

    if (!updatedEmp) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
    });
  } catch (error) {
    console.error("❌ Server Error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};


module.exports = updateEmployee