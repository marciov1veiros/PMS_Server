const mongoose = require("mongoose");

const SubscriptionSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.String,
            ref: "User",
            required: true,
        },
        campaign_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campaign",
            required: true,
        },
        date_creation: {
            type: Date,
            required: true,
            default: Date.now(),
        }
    }
);

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

module.exports = Subscription;