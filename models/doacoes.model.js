const mongoose = require("mongoose");
const DonationSchema = mongoose.Schema(
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
        value: {
            type: Number,
            required: [true, "Please enter the value"],
        },
        value_app: {
            type: Number,
            required: [true, "Please enter the value app"],
        },
        paypal: {
            type: String,
            required: false,
        },
        iban: {
            type: String,
            required: false,
        },
        mbway: {
            type: String,
            required: false,
        },
        creation_date: {
            type: Date,
            required: true,
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