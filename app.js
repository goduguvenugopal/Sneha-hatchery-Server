require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectToDatabase = require("./config/database");
const corsOptions = require("./utils/cors");
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(cors("*"));
// app.use(cors(corsOptions))

app.get("/", async (req, res) => {
  res.send("hello venu gopal server running");
});

// server listens
app.listen(PORT, async () => {
  try {
    //  db connection
    await connectToDatabase();
    console.log("⚡ Server running on port Number :", PORT);
  } catch (error) {
    console.error(error);
  }
});
