const GeneratorLog = require("../../model/GeneratorLog");
const { startGeneratorCron } = require("../cron/generatorCron");
const getShift = require("./getShift");

// Create generator log (turn ON)
const startGenerator = async (req, res) => {
  try {
    const { generatorId, firstEmpName, employeeCode } = req.body;
    const empId = req.empId; // logged-in user id

    const newLog = new GeneratorLog({
      logDate: new Date(),
      shift : getShift(),
      onTime: new Date(),
      generatorId,
      status: "on",
      firstEmpName,
      employeeCode,
      empId,
    });

    const savedLog = await newLog.save();

    // Schedule notification every 20 minutes
    startGeneratorCron(savedLog);

    return res.status(201).json({ success: true,message : "Generator ON successfully", data: savedLog });
  } catch (error) {
    console.error("❌ Start generator error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = startGenerator;
