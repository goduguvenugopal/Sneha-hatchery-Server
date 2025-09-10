const GeneratorLog = require("../../model/GeneratorLog");

// Delete log
const deleteLog = async (req, res) => {
  try {
    const { id } = req.params;
    const log = await GeneratorLog.findByIdAndDelete(id);

    if (!log) return res.status(404).json({ message: "Log not found" });

    return res.status(200).json({ success: true, message: "Log deleted" });
  } catch (error) {
    console.error("❌ Delete log error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = deleteLog;
