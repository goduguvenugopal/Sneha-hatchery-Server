const GeneratorLog = require("../../model/GeneratorLog");
const Employee = require("../../model/Empolyee")


// Delete log
const deleteLog = async (req, res) => {
  try {
    const { generatorId } = req.params;
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

    const log = await GeneratorLog.findByIdAndDelete(generatorId);

    if (!log) return res.status(404).json({ message: "Log not found" });

    return res.status(200).json({ success: true, message: "Log deleted" });
  } catch (error) {
    console.error("❌ Delete log error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = deleteLog;
