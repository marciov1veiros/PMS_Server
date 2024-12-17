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
        notify_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Notify",
            required: false,
        }],
        role_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
            required: true,
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
        xp_current: {
            type: Number,
            required: true,
            default: 0,
        },
        xp_total: {
            type: Number,
            required: true,
            default: 32,
        },
        donation_total: {
            type: Number,
            required: true,
            default: 0,
        },
        notify_type: [{
            type: String,
            enum: ['email', '', 'App'],
            required: true,
            default: '',
        }]
    },
    {
        timestamps: true
    }
);

UserSchema.plugin(passportLocalMongoose, {
    usernameField: '_id',
});

const User = mongoose.model("User", UserSchema);

module.exports = User;