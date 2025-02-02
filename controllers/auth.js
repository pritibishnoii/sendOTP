const User = require("../model/user.js");
const OTP = require("../model/otp.js");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { name, email, password, role, otp } = req.body;
    //   check for  if all details are provided
    if (!name || !email || !password || !otp) {
      return res.status(403).json({
        success: false,
        message: "All fields are required !!",
      });
    }

    //   check if the user olready exist
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User olready exist .......",
      });
    }
    // Find the most recent OTP for the email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log("otpResponse->>", response);
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }
    // Secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Hashing password error for ${password}: ` + error.message,
      });
    }

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    console.log("newUser-->>", newUser);

    return res.status(201).json({
      success: true,
      message: "User created Successfully....☑️☑️",
      user: newUser,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "something went wrong ",
      error: err.message,
    });
  }
};

module.exports = { signup };
