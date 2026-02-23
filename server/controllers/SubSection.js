const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const {uploadImageToCloudinary} = require("../utils/imageUploader");


// create section 
exports.createSubsection = async (req, res) => {
  try {
    // fetch data
    const { sectionId, title, description } = req.body;
    const video = req.files?.video;

    console.log("data: ", sectionId, title, description,  video);

    // validate
    if (!title || !description || !video || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // upload video
    const uploadVideo = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

    const timeDuration = uploadVideo.duration;

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
      data: updateSectionDetails,
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
        const {subSectionId, sectionId, title, description} = req.body;
        const video = req.files.video;

        if(!subSectionId || !sectionId || !title || !description || !video ){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }
        const updateVideo = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        const timeDuration = updateVideo.duration;

        const updateSubSectionDetails = await SubSection.findByIdAndUpdate(
          subSectionId,
          {title, description, videoUrl:updateVideo.secure_url, timeDuration},
          {new:true});

        const updateSectionDetails = await Section.findOneAndUpdate(
            sectionId,
            { $set: { "subSection.$.title": title, "subSection.$.description": description, "subSection.$.videoUrl": updateVideo.secure_url, "subSection.$.timeDuration": timeDuration } },
            { new: true }
        ).populate("subSection");

        return res.status(200).json({
            success:true,
            message:"Sub-section is updated successfully",
            data: updateSectionDetails
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
        const {subSectionId, sectionId} = req.body;
        await Section.findByIdAndUpdate(
          {_id: sectionId},
          { $pull: { subSection: subSectionId } },
          { new: true }
        );
        const subSection = await SubSection.findByIdAndDelete(subSectionId);

        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"Sub-section not found"
            });
        }

        const updatedSection = await Section.findById(sectionId).populate("subSection");

        return res.status(200).json({
            success:true,
            message:"Sub-section is deleted successfully",
            data: updatedSection
        });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to delete sub-section, please try again"
        });
    }
}