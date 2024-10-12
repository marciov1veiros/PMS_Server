const mongoose = require("mongoose");
const CampaignSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        total_value: {
            type: Number,
            required: [true, "Please enter the total value"],
        },
        total_value_app: {
            type: Number,
            required: [true, "Please enter the total value app"],
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        objective: {
            type: Number,
            required: [true, "Please enter the objective"],
        }
    }
);

const Campaign = mongoose.model("Campaign", CampaignSchema);

module.exports = Campaign;