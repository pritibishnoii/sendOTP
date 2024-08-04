const express = require("express");
const router = express.Router();

const { signup } = require("../controllers/auth");
const { sendOTP } = require("../controllers/otpController");

router.post("/signup", signup);

router.post("/sendotp", sendOTP);
module.exports = router;
