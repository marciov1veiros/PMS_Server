const mongoose = require("mongoose");
const CampaignSchema = mongoose.Schema(
    {
        user_email: {
            type: mongoose.Schema.Types.String,
            ref: "User",
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
            required: true
        },
        final_date: {
            type: Date,
            required: false,
            validate: {
                validator: function (v) {
                    return v > this.init_date;
                },
                message: "End date must be after the initial date",
            },
        },
        creation_date: {
            type: Date,
            required: true
        },
        aproval_date: {
            type: Date,
            required: false
        },
        total_value: {
            type: Number,
            required: [true, "Please enter the total value"],
        },
        total_value_app: {
            type: Number,
            required: [true, "Please enter the total value app"],
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
        state_date_change: {
            type: Date,
            required: false,
        },
        
    }
);

const Campaign = mongoose.model("Campaign", CampaignSchema);

module.exports = Campaign;