const mongoose = require("mongoose");
const DonationSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.String,
            ref: "User",
            required: true,
        },
        user_name: {
            type: String,
            required: true,
        },
        campaign_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campaign",
            required: false,
        },
        value: {
            type: Number,
            required: [true, "Please enter the value"],
        },
        value_app: {
            type: Number,
            required: [true, "Please enter the value app"],
        },
        payment_method: {
            type: String,
            required: false,
        },
        description_payment_method: {
            type: String,
            required: false,
        },
        creation_date: {
            type: Date,
            required: true,
            default: Date.now(),
        },
        refound: {
            type: Boolean,
            required: true,
            default: false,
        },
        refound_date: {
            type: Date,
            required: false,
        }
    }
);

const Donation = mongoose.model("Donation", DonationSchema);

module.exports = Donation;