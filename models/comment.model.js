const mongoose = require("mongoose");
const CommentSchema = mongoose.Schema(
    {
        campaign_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campaign",
            required: true,
        },
        user_email: {
            type: mongoose.Schema.Types.String,
            ref: "User",
            required: true,
        },
        description: {
            type: String,
            required: [true, "Please enter description"],
        },
        creation_date: {
            type: Date,
            required: true,
            default: Date.now(),
        }
    }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;