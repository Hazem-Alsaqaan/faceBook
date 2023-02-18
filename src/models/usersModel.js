const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        minLength: [3, "user name is too short"],
        maxLength: [32, "user name is too long"],
        required: true,
        trim: true,
    },
    email:{
        type: String,
        minLength: [6, "email is too short"],
        maxLength: [32, "email is too long"],
        unique: true,
        required: true,
        trim: true,
    },
    password:{
        type: String,
        minLength: [6, "password is too short"],
        maxLength: [200, "password is too long"],
        required: true,
        trim: true,
    },
    photo: {
        type: String,
    },
    background_img: {
        type: String,
    },
    job: {
        type: String
    },
    followers: [],
    following: []
},{timestamps: true})
const userModel = mongoose.model("user", userSchema)
module.exports = {userModel}