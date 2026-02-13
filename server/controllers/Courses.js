const Course = require("../models/Course");
const User = require("../models/User");
const Category = require("../models/Category");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createCourse = async (req, res) => {
    try {
        // Fetch data
        const { courseName, courseDescription, whatYouWillLearn, price, tag, category,instructions } = req.body;
        const thumbnail = req.files?.thumbnail;
       
        // Validation
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail || !category || !instructions) {

            return res.status(400).json({
                success: false,
                message: "All fields including category are required",
            });
        }

        // Validate instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor not found",
            });
        }

        // Validate category
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Invalid category ID",
            });
        }

        // Upload thumbnail
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // Create course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            whatYouWillLearn,
            instructor: instructorDetails._id,
            price,
            tag,
            instructions,
            thumbnail: thumbnailImage.secure_url,
            category: categoryDetails._id,
        });

        // Add new course to instructor's courses array
        await User.findByIdAndUpdate(
            instructorDetails._id,
            { $push: { courses: newCourse._id } },
            { new: true }
        );

        return res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: newCourse,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: error.message,
        });
    }
};

// Show all courses
exports.showAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({}, {
            courseName: true,
            price: true,
            thumbnail: true,
            instructor: true,
            ratingAndReviews: true,
            studentsEnrolled: true,
        }).populate("instructor").exec();

        return res.status(200).json({
            success: true,
            message: "Data for all courses fetched successfully",
            data: allCourses,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot fetch course data",
            error: error.message,
        });
    }
};

// Get course details
exports.getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;

        const courseDetails = await Course.findOne({ _id: courseId })
            .populate({
                path: "instructor",
                select: "-password -__v",
                populate: { path: "additionalDetail" }
            })
            .populate("category")
            //.populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: { path: "subSection" }
            }).exec();

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: `Could not find the course with ID ${courseId}`,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            data: courseDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching course details, please try again",
            error: error.message,
        });
    }
};
