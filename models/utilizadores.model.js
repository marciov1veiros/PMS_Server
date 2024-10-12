const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter the name"],
        },
        username: {
            type: String,
            required: [true, "Please enter the username"],
        },
        email: {
            type: String,
            required: [true, "Please enter the e-mail"],
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
    usernameField: 'username',
});

const User = mongoose.model("User", UserSchema);

module.exports = User;