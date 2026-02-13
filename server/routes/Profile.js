const express = require("express");
const router = express.Router();

const { auth, isAdmin } = require("../middlewares/auth");
const {
  updateProfile,
  getUserDetails,
  getAllProfiles,
  deleteUser,
  updateDisplayPicture,
  getEnrolledCourses,
} = require("../controllers/Profile");


// Update profile
router.put("/updateprofile", auth, updateProfile);

// Get current logged-in user profile
router.get("/me", auth, getUserDetails);

// Get all profiles (Admin only)
router.get("/all", auth, isAdmin, getAllProfiles);

// Delete user & profile
router.delete("/deleteProfile", auth, deleteUser);

// Update profile picture
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

router.get("/enrolledcourses", auth, getEnrolledCourses);

module.exports = router;
