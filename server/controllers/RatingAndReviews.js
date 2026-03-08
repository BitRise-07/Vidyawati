const mongoose = require("mongoose");
const RatingAndReview = require("../models/RatingAndReviews");
const Course = require("../models/Course");


// CREATE RATING
exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rating, review, courseId } = req.body;

    if (!rating || !review || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Rating, review and courseId are required",
      });
    }

    // Check if student enrolled
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnrolled: userId,
    });

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in this course",
      });
    }

    // Prevent duplicate review
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Course already reviewed by this user",
      });
    }

    // Create review
    const ratingReview = await RatingAndReview.create({
      user: userId,
      course: courseId,
      rating,
      review,
    });

    // Push review id in course
    await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { ratingAndReviews: ratingReview._id },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Rating and review added successfully",
      data: ratingReview,
    });
  } catch (error) {
    console.log("Error in create rating:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create rating",
      error: error.message,
    });
  }
};



// GET AVERAGE RATING
exports.getAverageRating = async (req, res) => {
  try {
    const { courseId } = req.body;

    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: "$course",
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating.toFixed(1),
      });
    }

    return res.status(200).json({
      success: true,
      averageRating: 0,
      message: "No ratings yet",
    });
  } catch (error) {
    console.log("Error in getAverageRating:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch average rating",
      error: error.message,
    });
  }
};



// GET ALL REVIEWS OF A COURSE
exports.getAllRatingAndReviews = async (req, res) => {
  try {
    const { courseId } = req.body;

    const ratingsAndReviews = await RatingAndReview.find({
      course: courseId,
    })
      .sort({ createdAt: -1 })   // newest first
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      });

    return res.status(200).json({
      success: true,
      count: ratingsAndReviews.length,
      data: ratingsAndReviews,
    });
  } catch (error) {
    console.log("Error in getAllRatingAndReviews:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};



// GET ALL REVIEWS OF ALL COURSES
exports.getAllRatingAndReviewsOfAllCourses = async (req, res) => {
  try {
    const ratingsAndReviews = await RatingAndReview.find({})
      .sort({ rating: -1 })
      .populate({
        path: "user",
        select: "firstName lastName email",
      })
      .populate({
        path: "course",
        select: "courseName",
      });

    return res.status(200).json({
      success: true,
      count: ratingsAndReviews.length,
      data: ratingsAndReviews,
    });
  } catch (error) {
    console.log("Error in getAllRatingAndReviewsOfAllCourses:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};