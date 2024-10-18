const mongoose = require("mongoose");
const VideoSchema = mongoose.Schema(
    {
        campaign_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campaign",
            required: false,
        },
        path: {
            type: String,
            required: [true, "Please enter the path to the video"],
        }
    }
);

const Video = mongoose.model("Video", VideoSchema);

module.exports = Video;