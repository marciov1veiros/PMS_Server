const mongoose = require("mongoose");

const NotifySchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.String,
            ref: "User",
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        origin: {
            type: String,
            required: false,
        },
        creation_date: {
            type: Date,
            required: true,
            default: Date.now(),
        }
    }
);

const Notify = mongoose.model("Notify", NotifySchema);

module.exports = Notify;