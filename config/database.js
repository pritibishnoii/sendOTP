const mongoose = require("mongoose");

require("dotenv").config();

exports.connectDB = () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("DATABASE CONNECTED SUCCESSFULLY ..💚💚💚💚");
      })
      .catch((err) => {
        console.log(`database connection error --> ${err}`);
        process.exit(1);
      });
  } catch (err) {
    console.log(err);
  }
};
