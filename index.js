const express = require("express");
const app = express();

require("dotenv").config();

const port = process.env.PORT;
// db connection
const DB = require("./config/database");
DB.connectDB();

app.listen(port, () => {
  console.log(`server is started on PORT ${port}`);
});

// Middleware to parse JSON bodies
app.use(express.json());
// import routes
const userRoute = require("./routes/userRoute");
app.use("/user", userRoute);
