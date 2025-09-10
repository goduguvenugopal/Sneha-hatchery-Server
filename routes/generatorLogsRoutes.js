const express = require("express");
const router = express.Router();
const startGenerator = require("../controller/generator/addGeneratorLogs");
const stopGenerator = require("../controller/generator/updateGeneratorLogs");
const getAllLogs = require("../controller/generator/getGeneratorLogs");
const deleteLog = require("../controller/generator/deleteGeneratorLogs");

// CRUD routes
router.post("/generator/start", startGenerator);
router.put("/generator/stop/:id", stopGenerator);
router.get("/generator/logs", getAllLogs);
router.delete("/generator/log/:id", deleteLog);

module.exports = router;
