const express = require("express");
const router = express.Router();

const { auth, isStudent } = require("../middlewares/auth");
const {
  addToCart,
  removeFromCart,
  getCart,
  clearCart, // 🔥
} = require("../controllers/Cart");

router.post("/:courseId", auth, isStudent, addToCart);
router.delete("/:courseId", auth, isStudent, removeFromCart);
router.delete("/", auth, isStudent, clearCart); 
router.get("/", auth, isStudent, getCart);

module.exports = router;
