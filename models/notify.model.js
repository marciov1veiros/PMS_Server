const mongoose = require("mongoose");

const NotifySchema = mongoose.Schema(
    {
        type: {
            type: String,
            required: [true, "Please enter the type"],
        }
    }
);

const Notify = mongoose.model("Notify", NotifySchema);

module.exports = Notify;