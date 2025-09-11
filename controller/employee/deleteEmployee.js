const Employee = require("../../model/Empolyee");

// DELETE employee
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const empId = req.empId;

    const retrievedEmp = await Employee.findById(empId);
    if (!retrievedEmp) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    if (!["incharge", "manager"].includes(retrievedEmp.designation)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only administrators can delete employees.",
      });
    }

    const deletedEmp = await Employee.findByIdAndDelete(id);

    if (!deletedEmp) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error("❌ Server Error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};


module.exports = deleteEmployee