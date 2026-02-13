const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const otpGenerator = require("otp-generator");

// send OTP

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const checkUser = await User.findOne({ email });

    if (checkUser) {
      return res.status(401).json({
        success: false,
        message: "User already exist",
      });
    }

    // generate otp

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });


    // otp is unique or not
    let result = await OTP.findOne({ otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp });
    }

    // create otp entry in db

    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);

    res.status(200).json({
      success: true,
      message: "otp sent successfully",
      otp,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// signup

exports.signUp = async (req, res) => {
  try {
    //fetch data from req body

    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    //validate data
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(402).json({
        success: false,
        message: "All fields are required",
      });
    }
    //match both password (confirm password and password)
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password value does not match",
      });
    }
    //check is user already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    //find most recent otp stored for users
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    //validate otp
    if (recentOtp.length == 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    } else if (recentOtp[0].otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is invalid",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //create entry in db
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      additionalDetail: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    //return res

    res.status(200).json({
      success: true,
      message: "User is register successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "User cannot be register, please try again",
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    //fetch data from req body
    const { email, password } = req.body;
    //validate data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    //check user exist or not
    const user = await User.findOne({ email }).populate("additionalDetail");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exist please signup first",
      });
    }
    //after password matching, generate jwt
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;
      


      //create cookie and send res
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      const cartCount = user.cart?.length || 0;
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        cartCount,
        message: "logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login falure please try again",
    });
  }
};
