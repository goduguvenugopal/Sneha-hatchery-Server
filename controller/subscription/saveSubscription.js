const Subscription = require("../../model/Subscription");

// Save subscription from client
const saveSubscription = async (req, res) => {
  try {
    const { subscription } = req.body;
    const employeeCode = req.empId; // logged-in user id

    // check if subscription already exists
    const existing = await Subscription.findOne({
      "subscription.endpoint": subscription.endpoint,
    });

    if (existing) {
      return res
        .status(200)
        .json({ success: true, message: "Subscription already exists" });
    }

    const newSub = new Subscription({
      employeeCode,
      subscription,
    });

    await newSub.save();

    return res
      .status(201)
      .json({ success: true, message: "Subscription saved" });
  } catch (error) {
    console.error("❌ Save subscription error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = saveSubscription;
