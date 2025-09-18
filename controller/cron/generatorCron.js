const cron = require("node-cron");
const GeneratorLog = require("../../model/GeneratorLog");
const Subscription = require("../../model/Subscription");
const webpush = require("../../utils/webPush");

// Map to keep track of active cron jobs
const activeCrons = new Map();

function startGeneratorCron(savedLog) {
  const task = cron.schedule("*/10 * * * *", async () => {
    try {
      const log = await GeneratorLog.findById(savedLog._id);
      if (!log || log.status !== "on") {
        task.stop();
        activeCrons.delete(savedLog._id.toString());
        console.log(`Generator ${savedLog.generatorId} cron stopped.`);
        return;
      }

      const minutesRunning = (Date.now() - log.onTime.getTime()) / 60000;

      const allSubs = await Subscription.find();
      allSubs.forEach(async (sub) => {
        try {
          await webpush.sendNotification(
            sub.subscription,
            JSON.stringify({
              title: "⚡ Generator Reminder",
              body: `Generator ${
                log.generatorId
              } has been running for ${Math.floor(
                minutesRunning / 60
              )}h ${Math.floor(minutesRunning % 60)}m. ${
                log.firstEmpName
              }, please check power status.`,
            })
          );
        } catch (err) {
          if (err.statusCode === 410 || err.statusCode === 404) {
            console.warn(
              "❌ Removing expired subscription:",
              sub.subscription.endpoint
            );
            // 🔥 Remove from DB so it doesn’t keep failing
            await Subscription.deleteOne({
              "subscription.endpoint": sub.subscription.endpoint,
            });
          } else {
            console.error("Push Error:", err);
          }
        }
      });
    } catch (err) {
      console.error("Cron Job Error:", err);
    }
  });

  task.start();
  activeCrons.set(savedLog._id.toString(), task);
  return task;
}

// stop generator cron schedule function
function stopGeneratorCron(generatorLogId) {
  const task = activeCrons.get(generatorLogId.toString());
  if (task) {
    task.stop();
    activeCrons.delete(generatorLogId.toString());
    console.log(`Generator cron for ${generatorLogId} stopped manually.`);
  }
}

module.exports = { startGeneratorCron, stopGeneratorCron };
