const mongoose = require("mongoose");
const CampaignSchema = mongoose.Schema(
    {
        user_email: {
            type: mongoose.Schema.Types.String,
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
        },
        category: {
            type: String,
            required: [true, "Please insert the category of the campaign"],
        },
        priority: {
            type: String,
            enum: ['high', 'normal', 'low', 'urgent'],
            required: true,
            default: 'low',
        },
        state: {
            type: String,
            enum: ['active', 'inactive'],
            required: true,
            default: 'active',
        },
        state_description: {
            type: String,
            required: false,
        },
        state_alt_user: {
            type: mongoose.Schema.Types.String,
            ref: "User",
            required: false,
        },
        state_alt_date: {
            type: Date,
            required: false,
        },
        init_date: {
            type: Date,
            required: true
        },
        end_date: {
            type: Date,
            required: false,
            validate: {
                validator: function (v) {
                    return v > this.init_date;
                },
                message: "End date must be after the initial date",
            },
        }
    }
);

const Campaign = mongoose.model("Campaign", CampaignSchema);

module.exports = Campaign;