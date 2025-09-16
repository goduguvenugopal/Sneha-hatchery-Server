require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectToDatabase = require("./config/database");
const corsOptions = require("./utils/cors");
const employeeRoutes = require("./routes/employeeRoutes");
const generatorLogRoutes = require("./routes/generatorLogsRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const getShift = require("./controller/generator/getShift");
 
// middlewares
app.use(express.json());
// app.use(cors("*"));
app.use(cors(corsOptions))

// Register all Employee routes with a global "/api" prefix
app.use("/api", employeeRoutes);
app.use("/api", generatorLogRoutes);
app.use("/api", subscriptionRoutes);

const PORT = process.env.PORT || 3000;

// server listens
app.listen(PORT, async () => {
  try {
    // db connection
    await connectToDatabase();
    console.log("⚡ Server running on port Number :", PORT);
  } catch (error) {
    console.error(error);
  }
});
