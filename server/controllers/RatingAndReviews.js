const RatingAndReview = require("../models/RatingAndReviews");
const Course = require("../models/Course");

// create rating

exports.createRating = async (req, res) =>{
    try{
        const userId = req.user.id;
        const {rating, review, courseId} = req.body;

        const courseDetails = await Course.findOne(
                                        {_id:courseId,
                                        studentsEnrolled:{$elemMatch:{$eq:userId}},
                                        }
                                        
        );

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in this course"
            });
        }

        const alreadyReviewed = await RatingAndReview.findOne(
                                                {
                                                    user:userId,
                                                    course:courseId
                                                }
        );
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"Course is already reviewed by the user"
            });
        }

        const ratingReview = await RatingAndReview.create({
            user:userId,
            course:courseId,
            rating:rating,
            review:review
        });

        const updatedCourse = await Course.findByIdAndUpdate(
            {_id:courseId},
            {
                $push:{
                    ratingAndReviews:ratingReview._id
                }
            },
            {new:true}
        );
        console.log(updatedCourse)

        return res.status(200).json({
            success:true,
            message:"Rating and review added successfully",
            data:ratingReview
        });


    }
    catch(error){
        console.log("Error in create rating and review", error);
        return res.status(500).json({
            success:false,
            message:"Error in create rating and review",
            error:error.message
        });

    }
}

// get average rating of a course

exports.getAverageRating = async (req, res) =>{
    try{
        const courseId = req.body.courseId;

        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},
                }
            }
        ])

        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating
            });
        }

        return res.status(200).json({
            success:true,
            averageRating:0
        });


    }
    catch(error){
        console.log("Error in get average rating", error);
        return res.status(500).json({
            success:false,
            message:"Error in get average rating",
            error:error.message
        });
    }
};

// get all rating and reviews for a course

exports.getAllRatingAndReviews = async (req, res) =>{
    try{
        const courseId = req.body.courseId;

        const ratingsAndReviews = await RatingAndReview.find({course:courseId})
                                                .sort({rating:"desc"})
                                                .populate(
                                                    {
                                                        path:"user",
                                                        select:"firstName lastName email"
                                                    }
                                                )
                                                .populate({
                                                    path:"course",
                                                    select:"courseName"
                                                }).exec();
                                                

        return res.status(200).json({
            success:true,
            data:ratingsAndReviews
        });
    }
    catch(error){
        console.log("Error in get all rating and reviews", error);
        return res.status(500).json({
            success:false,
            message:"Error in get all rating and reviews",
            error:error.message
        });
    }
};


// get all rating and reviews of all coursers

exports.getAllRatingAndReviewsOfAllCourses = async (req, res) =>{
    try{
        const ratingsAndReviews = await RatingAndReview.find({})
                                                .sort({rating:"desc"})
                                                .populate(
                                                    {
                                                        path:"user",
                                                        select:"firstName lastName email"
                                                    }
                                                )
                                                .populate({
                                                    path:"course",
                                                    select:"courseName"
                                                }).exec();

        return res.status(200).json({
            success:true,
            data:ratingsAndReviews
        });
    }
    catch(error){
        console.log("Error in get all rating and reviews", error);
        return res.status(500).json({
            success:false,
            message:"Error in get all rating and reviews",
            error:error.message
        });
    }
};

