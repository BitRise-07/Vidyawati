const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.changePassword = async (req, res) => {
  try {
    const { password, newPassword, confirmNewPassword } = req.body;
    const userId = req.user.id;

    if (!password || !newPassword || !confirmNewPassword) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (newPassword !== confirmNewPassword) {
      return res.status(402).json({
        success: false,
        message: "Both the password is not matching, please fill correctly",
      });
    }

    const user = await User.findById( userId );
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exist please signup first",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while changing password, please try again",
    });
  }
};
