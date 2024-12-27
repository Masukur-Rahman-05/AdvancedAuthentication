import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required:true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    verificationToken: String,
    verificationTokenExpire: Date,

    createdAt: {
        type:Date,
        default:Date.now
    }
})

export const User = mongoose.model("User", UserSchema)