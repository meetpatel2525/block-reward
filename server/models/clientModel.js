import mongoose from "mongoose";

const clientSchema = mongoose.Schema({
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
});

export const Client = mongoose.model("client", clientSchema);