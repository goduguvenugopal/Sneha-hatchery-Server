const GeneratorLog = require("../../model/GeneratorLog");

// Update generator log (turn OFF)
const stopGenerator = async (req, res) => {
  try {
    const { id } = req.params;
    const log = await GeneratorLog.findById(id);

    if (!log) {
      return res.status(404).json({ message: "Log not found" });
    }

    log.offTime = new Date();
    log.status = "off";
    log.duration = `${Math.floor((log.offTime - log.onTime) / 60000)} minutes`;

    const updatedLog = await log.save();

    return res.status(200).json({ success: true, data: updatedLog });
  } catch (error) {
    console.error("❌ Stop generator error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = stopGenerator;
