const Section = require("../models/Section");
const Course = require("../models/Course");

// Create section
exports.createSection = async (req, res) => {
    try {
        const { sectionName, courseId } = req.body;
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Create new section
        const newSection = await Section.create({ sectionName });

        // Update course with new section
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { $push: { courseContent: newSection._id } },
            { new: true }
        ).populate({
            path: 'courseContent',
            populate: {
                path: 'subSection', 
                model: 'SubSection'
            }
        });

        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            data: updatedCourse
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating section, please try again",
            error: error.message
        });
    }
};

// Update section
exports.updateSection = async (req, res) => {
    try {
        const { sectionName, sectionId } = req.body;
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const section = await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            data: section
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update section",
            error: error.message
        });
    }
};

// Delete section
exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;

    if (!sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Section ID and Course ID are required",
      });
    }

    // ✅ Delete the section
    const deletedSection = await Section.findByIdAndDelete(sectionId);
    if (!deletedSection) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // ✅ Remove section reference from course
    await Course.findByIdAndUpdate(
      courseId,
      { $pull: { courseContent: sectionId } }, // remove sectionId from courseContent array
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully and course updated",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete section",
      error: error.message,
    });
  }
};

