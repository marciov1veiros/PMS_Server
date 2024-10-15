const mongoose = require("mongoose");
const ImageSchema = mongoose.Schema(
    {
        campaign_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campaign",
            required: true,
        },
        path: {
            type: String,
            required: [true, "Please enter the path to the image"],
        }
    }
);

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;