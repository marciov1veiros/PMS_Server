const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            required: [true, "Please enter the e-mail"],
        },
        name: {
            type: String,
            required: [true, "Please enter the name"],
        },
        surname: {
            type: String,
            required: [true, "Please enter the surname"],
        },
        anonymous: {
            type: Boolean,
            required: true,
        },
        notify: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Notify",
            required: false,
        }],
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
            required: true,
        }
    }
);

UserSchema.plugin(passportLocalMongoose, {
    usernameField: '_id',
});

const User = mongoose.model("User", UserSchema);

module.exports = User;