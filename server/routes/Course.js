const express = require("express");
const router = express.Router();

const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middlewares/auth");

const {
  createCourse,
  showAllCourses,
  getCourseDetails,
  editCourse,
} = require("../controllers/Courses");

const {
    createCategory,
    getAllCategory,
    getCategoryPageDetails
} = require("../controllers/Category");

const {
  createRating,
  getAverageRating,
  getAllRatingAndReviews,
  getAllRatingAndReviewsOfAllCourses,
} = require("../controllers/RatingAndReviews");

const {createSection, updateSection, deleteSection} = require("../controllers/Section");
const {createSubsection, updateSubSection, deleteSubSection} = require("../controllers/SubSection");

 
router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/editCourse", auth, isInstructor, editCourse);
router.post("/getCourseDetails", getCourseDetails);
router.get("/getAllCourses", showAllCourses);
router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);

router.post("/addSubSection", auth, isInstructor, createSubsection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

// rating and reviews
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRatingAndReviews)
router.get("/getAllReviews", getAllRatingAndReviewsOfAllCourses);

//category
router.post("/addCategory", auth, isAdmin, createCategory);
router.get("/getAllCategory", getAllCategory); 
router.post("/getallCategoryPage", getCategoryPageDetails);



module.exports = router;
