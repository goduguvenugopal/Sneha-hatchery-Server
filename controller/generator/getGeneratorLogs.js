const GeneratorLog = require("../../model/GeneratorLog");

// Get all logs
const getAllLogs = async (req, res) => {
  try {
    const logs = await GeneratorLog.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: logs });
  } catch (error) {
    console.error("❌ Get logs error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

 

module.exports = getAllLogs;
