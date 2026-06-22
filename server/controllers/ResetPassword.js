const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { passwordUpdate } = require("../email/templates/passwordUpdate");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// Generate reset password token and send email
exports.resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Your email is not registered"
            });
        }

        // Generate a secure token and hash it before saving
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        // Set token and expiration in DB (5 minutes)
        user.token = hashedToken;
        user.resetPasswordExpires = Date.now() + 5 * 60 * 1000;
        await user.save({ validateBeforeSave: false });

        const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
        const url = `${clientUrl.replace(/\/$/, "")}/update-password/${resetToken}`;

        // Send email
        await mailSender(email, "Password Reset Link", `Click here to reset your password: ${url}`);

        return res.json({
            success: true,
            message: "Reset password email sent successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while sending reset password email"
        });
    }
};

// Reset password using token
exports.resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;

        if (password !== confirmPassword) {
            return res.json({
                success: false,
                message: "Passwords do not match"
            });
        }

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    
        // Find user with valid token and not expired
        const userDetails = await User.findOne({
            token: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!userDetails) {
            return res.json({
                success: false,
                message: "Token is invalid or expired"
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update password and clear token fields
        userDetails.password = hashedPassword;
        userDetails.token = undefined;
        userDetails.resetPasswordExpires = undefined;
        await userDetails.save();

        await mailSender(
            userDetails.email,
            "Your Vidyawati password was updated",
            passwordUpdate(`${userDetails.firstName} ${userDetails.lastName}`)
        );

        return res.status(200).json({
            success: true,
            message: "Password reset successful"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while resetting password"
        });
    }
};
