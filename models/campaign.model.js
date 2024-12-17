const mongoose = require("mongoose");
const CampaignSchema = mongoose.Schema(
    {
        user_email: {
            type: mongoose.Schema.Types.String,
            ref: "User",
            required: true,
        },
        user_name: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
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
        objective: {
            type: Number,
            required: [true, "Please enter the objective"],
        },
        inicial_date: {
            type: Date,
            required: true,
            default: Date.now(),
        },
        final_date: {
            type: Date,
            required: false,
            validate: {
                validator: function (v) {
                    return v > this.inicial_date;
                },
                message: "End date must be after the initial date",
            },
        },
        creation_date: {
            type: Date,
            required: true,
            default: Date.now(),
        },
        aproval_date: {
            type: Date,
            required: false
        },
        total_value: {
            type: Number,
            required: [true, "Please enter the total value"],
            default: 0,
        },
        total_value_app: {
            type: Number,
            required: [true, "Please enter the total value app"],
            default: 0,
        },
        state: {
            type: String,
            enum: ['active', 'inactive', 'suspend'],
            required: true,
            default: 'inactive',
        },
        state_description: {
            type: String,
            required: false,
        },
        state_date_change: {
            type: Date,
            required: false,
        },
        donation_min_value: {
            type: Number,
            required: false
        },
        local: {
            type: String,
            required: true
        }
    }
);

const Campaign = mongoose.model("Campaign", CampaignSchema);

module.exports = Campaign;