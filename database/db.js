const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to the database");
  } catch (error) {
    console.log("Error connecting to the database: ", error);
    process.exit(1);
  }
};

module.exports = connectToDb