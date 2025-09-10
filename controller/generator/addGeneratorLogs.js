const GeneratorLog = require("../../model/GeneratorLog")
const Subscription = require("../../model/Subscription")
const webpush = require("../utils/webPush");
const cron = require("node-cron");

// Create generator log (turn ON)
const startGenerator = async (req, res) => {
  try {
    const { shift, generatorId, employeeName, employeeCode } = req.body;

    const newLog = new GeneratorLog({
      logDate: new Date(),
      shift,
      onTime: new Date(),
      generatorId,
      status: "on",
      employeeName,
      employeeCode,
    });

    const savedLog = await newLog.save();

// Schedule notification every 20 minutes
cron.schedule("*/20 * * * *", async () => {
  try {
    const log = await GeneratorLog.findById(savedLog._id);
    if (!log) return;

    // Only proceed if generator is ON
    if (log.status === "on") {
      const minutesRunning = (Date.now() - log.onTime.getTime()) / 60000;

      const allSubs = await Subscription.find();
      allSubs.forEach((sub) => {
        webpush
          .sendNotification(
            sub.subscription,
            JSON.stringify({
              title: "⚡ Generator Reminder",
              body: `Generator ${log.generatorId} has been running for ${Math.floor(
                minutesRunning
              )} minutes. Please check power status.`,
            })
          )
          .catch((err) => console.error("Push Error:", err));
      });
    }
  } catch (err) {
    console.error("Cron Job Error:", err);
  }
});

    return res.status(201).json({ success: true, data: savedLog });
  } catch (error) {
    console.error("❌ Start generator error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = startGenerator
