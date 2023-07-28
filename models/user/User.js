
import mongoose from "mongoose";
const { Schema } = mongoose;


const userSchema = new Schema({
    userid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
    },
    account: String,
    category: String,
    followers: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ],
    following: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ],
    subscribers: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ],
    website: {
        link1: String,
        link2: String,
    },
    bio: String,
    gender: String,
    number: String,

}, { timestamps: true,suppressReservedWarning: true , suppressReservedKeysWarning:true});

export const User = mongoose.model("User", userSchema);





