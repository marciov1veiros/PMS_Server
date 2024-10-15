const mongoose = require("mongoose");
const CommentSchema = mongoose.Schema(
    {
        campaign_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campaign",
            required: true,
        },
        description: {
            type: String,
            required: [true, "Please enter description"],
        },
        creation_date: {
            type: Date,
            required: true
        }
    }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;