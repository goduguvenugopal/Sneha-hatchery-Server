const express = require("express");
const router = express.Router();
const startGenerator = require("../controller/generator/addGeneratorLogs");
const stopGenerator = require("../controller/generator/updateGeneratorLogs");
const getAllLogs = require("../controller/generator/getGeneratorLogs");
const deleteLog = require("../controller/generator/deleteGeneratorLogs");
const verifyToken = require("../utils/middleware");

// CRUD routes
router.post("/generator/start", verifyToken, startGenerator);
router.put("/generator/stop/:generatorId", verifyToken, stopGenerator);
router.get("/generator/logs", verifyToken, getAllLogs);
router.delete("/generator/log/:generatorId", verifyToken, deleteLog);

module.exports = router;
