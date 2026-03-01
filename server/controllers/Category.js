const Category = require("../models/Category");
const Course = require("../models/Course");
const mongoose = require("mongoose");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({
        success: true,
        message: "All fields are required",
      });
    }
    const categoryDetails = Category.create({
      name: name,
      description: description,
    });

    console.log(categoryDetails);
    return res.status(200).json({
      success: true,
      message: "Category ccreated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating category, please try again",
    });
  }
};

//getAll category handler function
exports.getAllCategory = async (req, res) => {
  try {
    const data = await Category.find({});
    res.status(200).json({
      success: true,
      message: "All category returned successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }

    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: [{ path: "ratingAndReviews" }, { path: "instructor" }],
      })
      .exec();

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const mostSellingCourseInCategory = await Course.aggregate([
      {
        $match: {
          category: new mongoose.Types.ObjectId(categoryId),
          status: "Published",
        },
      },
      {
        $addFields: {
          enrolledCount: { $size: "$studentsEnrolled" },
        },
      },
      {
        $sort: { enrolledCount: -1 },
      },
      {
        $limit: 10,
      },

      // 🔥 Populate instructor
      {
        $lookup: {
          from: "users", // collection name of User model
          localField: "instructor",
          foreignField: "_id",
          as: "instructor",
        },
      },
      {
        $unwind: "$instructor",
      },
    ]);

    const mostSellingCourse = await Course.aggregate([
      { $match: { status: "Published" } },

      {
        $addFields: {
          enrolledCount: {
            $size: { $ifNull: ["$studentsEnrolled", []] },
          },
        },
      },

      { $sort: { enrolledCount: -1 } },
      { $limit: 10 },

      {
        $lookup: {
          from: "users",
          localField: "instructor",
          foreignField: "_id",
          as: "instructor",
        },
      },

      { $unwind: "$instructor" },
    ]);

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory: mostSellingCourseInCategory,
        mostSellingCourse,
      },
    });
  } catch (error) {
    console.error("CATEGORY PAGE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
