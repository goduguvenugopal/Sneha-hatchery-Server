const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    employeeCode: {
      type: Number,
      required: true,
    },
    subscription: {
      endpoint: { type: String, required: true },
      expirationTime: { type: Date, default: null },
      keys: {
        p256dh: { type: String, required: true },
        auth: { type: String, required: true },
      },
    },
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
