const { trusted } = require("mongoose");
const Course = require("../models/Course");
const User = require("../models/User");

exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { courseId } = req.params;

        const user = await User.findById(userId);

        if (user.cart.includes(courseId)) {
            return res.status(400).json({
                success: false,
                message: "Course already in cart",
            });
        }

        user.cart.push(courseId);
        await user.save();

        res.status(200).json({
            success: true,
            message: "Course added to cart",
            cartLength: user.cart.length,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { courseId } = req.params;

        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { cart: courseId } },
            {new:trusted}
        );

        res.status(200).json({
            success: true,
            message: "Course removed from cart",
            cartLength: user.cart.length,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId)
            .populate("cart");

            
        return res.status(200).json({
            success: true,
            cart: user.cart,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByIdAndUpdate(
      userId,
      { cart: [] },          
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      cartLength: user.cart.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

