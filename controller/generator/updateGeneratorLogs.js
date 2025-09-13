const GeneratorLog = require("../../model/GeneratorLog");
const { stopGeneratorCron } = require("../cron/generatorCron");

// Update generator log (turn OFF)
const stopGenerator = async (req, res) => {
  try {
    const { generatorId } = req.params;
    let log = await GeneratorLog.findById(generatorId);
    const empId = req.empId; // logged-in user id

    const retrievedEmp = await Employee.findById(empId);
    if (!log || !retrievedEmp) {
      return res.status(404).json({ message: "Log not found" });
    }

    log.offTime = new Date();
    log.status = "off";
    log.duration = Math.floor((log.offTime - log.onTime) / 60000)
    log.secondEmpName = retrievedEmp.employeeName;

    const updatedLog = await log.save();
    // Stop cron job for this generator
    stopGeneratorCron(generatorId);

    return res.status(200).json({message : "Generator Off Successfully", success: true, data: updatedLog });
  } catch (error) {
    console.error("❌ Stop generator error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = stopGenerator;
