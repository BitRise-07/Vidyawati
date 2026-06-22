const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const mongoose = require("mongoose");

// ✅ Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const {
      firstName = "",
      lastName = "",
      dateOfBirth = "",
      about = "",
      contactNumber,
      gender,
      instagram,
      twitter
    } = req.body;
    const id = req.user.id;

    const userDetail = await User.findById(id);
    if (!userDetail) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const profileId = userDetail.additionalDetail;
    const profileDetail = await Profile.findById(profileId);


    const user = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
      },
      { new: true }
    );

    if (dateOfBirth) profileDetail.dateOfBirth = dateOfBirth;
    if (about !== undefined) profileDetail.about = about;

    if (gender) {
      profileDetail.gender = gender;
    }

    if (contactNumber !== undefined) {
      profileDetail.contactNumber = contactNumber;
    }
    if (instagram !== undefined)
      profileDetail.instagram = instagram;

    if (twitter !== undefined)
      profileDetail.twitter = twitter;

    await profileDetail.save();

    const updatedUserDetails = await User.findById(id)
      .select("-password -token -resetPasswordExpires")
      .populate("additionalDetail")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUserDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

// ✅ Get current logged-in user details
exports.getUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetail = await User.findById(id)
      .populate("additionalDetail")
      .exec();

    if (!userDetail) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      data: userDetail,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user details",
      error: error.message,
    });
  }
};

// ✅ Get all profiles (Admin only)
exports.getAllProfiles = async (req, res) => {
  try {
    const users = await User.find()
      .populate("additionalDetail")
      .select("-password"); // don’t expose password

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch all profiles",
      error: error.message,
    });
  }
};

// ✅ Delete user & profile
exports.deleteUser = async (req, res) => {
  try {
    const id = req.user.id;
  
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Delete Assosiated Profile with the User
    await Profile.findByIdAndDelete({
      _id: new mongoose.Types.ObjectId(user.additionalDetail),
    });
    for (const courseId of user.courses) {
      await Course.findByIdAndUpdate(
        courseId,
        { $pull: { studentsEnrolled: id } },
        { new: true }
      );
    }
    await CourseProgress.deleteMany({ userId: id });
    // Now Delete User
    await User.findByIdAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "User Cannot be deleted successfully" });
  }
};

// ✅ Update profile picture
exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files?.displayPicture;
    if (!displayPicture) {
      return res.status(400).json({
        success: false,
        message: "Display picture is required",
      });
    }

    const userId = req.user.id;
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Image updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const userDetail = await User.findById(userId)
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();

    if (!userDetail) {
      return res.status(404).json({
        success: false,
        message: `Could not find user with id: ${userId}`,
      });
    }

    const progressRecords = await CourseProgress.find({
      userId,
      courseID: { $in: userDetail.courses.map((course) => course._id) },
    }).lean();

    const progressByCourse = new Map(
      progressRecords.map((progress) => [
        String(progress.courseID),
        progress.completedVideos?.map((lectureId) => String(lectureId)) || [],
      ])
    );

    const coursesWithProgress = (userDetail.courses || []).map((course) => {
      const courseObject = course.toObject();
      const lectures =
        courseObject.courseContent?.flatMap((section) => section.subSection || []) || [];
      const totalLectures = lectures.length;
      const completedVideos = progressByCourse.get(String(courseObject._id)) || [];
      const progressPercentage = totalLectures
        ? Math.round((completedVideos.length / totalLectures) * 100)
        : 0;
      const totalSeconds = lectures.reduce(
        (total, lecture) => total + (Number(lecture.timeDuration) || 0),
        0
      );

      return {
        ...courseObject,
        completedVideos,
        progressPercentage,
        totalDuration: totalSeconds,
        totalLectures,
      };
    });

    return res.status(200).json({
      success: true,
      data: coursesWithProgress,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
