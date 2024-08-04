const OTP = require("../model/otp");
const User = require("../model/user");
const otpGenerator = require("otp-generator");

const sendOTP = async (req, res) => {
  try {
    // Check if user already exists
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "User already present",
        user: existingUser, // Be cautious about exposing sensitive user data
      });
    }

    // Generate numeric OTP if user doesn't exist
    let otp = otpGenerator.generate(6, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("otp==>", otp);

    // Optionally check for duplicate OTP (if necessary)
    let existingOTP = await OTP.findOne({ otp: otp });
    while (existingOTP) {
      otp = otpGenerator.generate(6, {
        digits: true,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      existingOTP = await OTP.findOne({ otp: otp });
    }

    // Save OTP to the database
    let otpPayload = { email, otp };
    console.log("otpPayload-->", otpPayload);
    const otpBody = await OTP.create(otpPayload);

    res.status(200).json({
      success: true,
      message: "OTP Sent Successfully..✅✅✅✅",
      otp,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { sendOTP };
