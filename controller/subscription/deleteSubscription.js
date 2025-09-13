const Subscription = require("../../model/Subscription");

// Delete subscription by employeeCode or endpoint
const deleteSubscription = async (req, res) => {
  try {
    const { endpoint } = req.body;
    const employeeCode = req.empId; // logged-in user id

    let deleted;

    if (employeeCode) {
      deleted = await Subscription.findOneAndDelete({ employeeCode });
    } else if (endpoint) {
      deleted = await Subscription.findOneAndDelete({
        "subscription.endpoint": endpoint,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Provide employeeCode or subscription endpoint",
      });
    }

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Subscription deleted" });
  } catch (error) {
    console.error("❌ Delete subscription error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = deleteSubscription;
