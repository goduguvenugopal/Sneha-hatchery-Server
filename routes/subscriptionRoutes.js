const express = require("express");
const router = express.Router();
const deleteSubscription = require("../controller/subscription/deleteSubscription");
const saveSubscription = require("../controller/subscription/saveSubscription");

// Web Push subscription route
router.post("/subscribe", saveSubscription);
router.delete("/unsubscribe", deleteSubscription);

module.exports = router;
