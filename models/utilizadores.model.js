const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            required: [true, "Please enter the e-mail as ID"],
        },
        name: {
            type: String,
            required: [true, "Please enter the name"],
        },
        surname: {
            type: String,
            required: [true, "Please enter the surname"],
        },
        email: {
            type: String,
            required: [true, "Please enter the e-mail"],
            unique: true,
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
    },
    { _id: false }
);

UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
});

const User = mongoose.model("User", UserSchema);

module.exports = User;