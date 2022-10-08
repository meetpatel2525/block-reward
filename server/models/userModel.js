import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    token: {
        type: String,
        required: false,
        default: null
    },

    verified: {
        type: Boolean,
        default: false
    },
});

export const User = mongoose.model("User", userSchema);