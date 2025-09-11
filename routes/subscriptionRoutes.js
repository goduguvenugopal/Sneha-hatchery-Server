const express = require("express");
const router = express.Router();
const deleteSubscription = require("../controller/subscription/deleteSubscription");
const saveSubscription = require("../controller/subscription/saveSubscription");
const verifyToken = require("../utils/middleware");

// Web Push subscription route
router.post("/subscribe", verifyToken, saveSubscription);
router.delete("/unsubscribe", verifyToken, deleteSubscription);

module.exports = router;
