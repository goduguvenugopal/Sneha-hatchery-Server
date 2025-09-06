const mongoose = require("mongoose");

// connect to database
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Mongodb connected successfully");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectToDatabase;
