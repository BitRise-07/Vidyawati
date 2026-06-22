const mongoose = require("mongoose");

const courseProgress = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    completedVideos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubSection",
        },
    ],
}, {
    timestamps: true,

});

courseProgress.index(
    { userId: 1, courseID: 1 },
    {
        unique: true,
        partialFilterExpression: {
            userId: { $exists: true },
            courseID: { $exists: true },
        },
    }
);

module.exports = mongoose.model("CourseProgress", courseProgress);
