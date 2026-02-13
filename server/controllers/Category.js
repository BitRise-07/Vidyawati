const Category = require("../models/Category");
const Course = require("../models/Course");



exports.createCategory = async (req, res) => {
    try{
        const {name, description} = req.body;
        if(!name || !description){
            return res.status(400).json({
                success:true,
                message:"All fields are required"
            });
        }
        const categoryDetails = Category.create({
            name:name,
            description:description,
        });

        console.log(categoryDetails);
        return res.status(200).json({
            success:true,
            message:"Category ccreated successfully"
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Something went wrong while creating category, please try again"
        });
    }
};

//getAll category handler function
exports.getAllCategory = async (req, res) => {
    try{
        const data = await Category.find({});
        res.status(200).json({
            success:true,
            message:"All category returned successfully",
            data,
        });


    }catch(error){
        return res.status(500).json({
            success:false,
            error:error.message
        });
    }
}

// category page details
exports.getCategoryPageDetails = async (req, res) =>{
    try{
        const categoryId = req.body.categoryId;
        const categoryDetails = await Category.findById(categoryId).populate("courses").exec();
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"Category not found"
            });
        }

        if(categoryDetails.courses.length === 0){
            return res.status(200).json({
                success:true,
                message:"No courses found in this category"
            });
        }
        // get courses for different categories
        const differentCategoryCourses = await Category.find({_id:{$ne:categoryId}})
                                                    .populate("courses").exec();

        // get top selling courses
        const topSellingCourses = await Course.find({category:categoryId})
                                        .sort({studentsEnrolled:-1})
                                        .limit(10)
                                        .populate("instructor")
                                        .exec();
        return res.status(200).json({
            success:true,
            message:"Category details fetched successfully",
            data:{
                categoryDetails,
                differentCategoryCourses,
                topSellingCourses
            }
        });
            

    }catch(error){
        return res.status(500).json({
            success:false,
            error:error.message
        });
    }
}