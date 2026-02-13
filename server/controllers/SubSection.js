const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const {uploadImageToCloudinary} = require("../utils/imageUploader");


// create section 
exports.createSubsection = async (req, res) => {
  try {
    // fetch data
    const { sectionId, title, description, timeDuration } = req.body;
    const video = req.files?.videoFile;

    // validate
    if (!title || !description || !timeDuration || !video || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // upload video
    const uploadVideo = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

    // create subsection
    const SubsectionDetails = await SubSection.create({
      title,
      description,
      timeDuration,
      videoUrl: uploadVideo.secure_url,
    });

    // update section with new subsection
    const updateSectionDetails = await Section.findByIdAndUpdate(
      sectionId,
      { $push: { subSection: SubsectionDetails._id } },
      { new: true }
    ).populate("subSection");

    // send response
    res.status(200).json({
      success: true,
      message: "Sub-section created successfully",
      data: SubsectionDetails,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating subsection, please try again",
      error: error.message,
    });
  }
};


exports.updateSubSection = async (req, res) => {
    try{
        const {SubSectionId, title, description, timeDuration} = req.body;
        const video = req.files.videoFile;

        if(!SubSectionId || !title || !description || !timeDuration || !video ){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }
        const updateVideo = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        const updateSubSectionDetails = SubSection.findByIdAndUpdate({SubSectionId}, {title}, {description},{videoUrl:updateVideo.secure_url},{new:true});

        return res.status(200).json({
            success:true,
            message:"Sub-section is updated successfully"
        });

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Failed to update sub-section, please try again"
        });
    }
};

exports.deleteSubSection = async (req, res) => {
    try{
        const {subSectionId} = req.params;
        await SubSection.findByIdAndDelete({subSectionId});

        return res.status(200).json({
            success:true,
            message:"Sub-section is deleted successfully"
        });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to delete sub-section, please try again"
        });
    }
}