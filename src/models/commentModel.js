const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    posts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: true
    },
    user: {
        type :mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    } 
}, {timestamps: true})
const commentModel = mongoose.model("comments", commentSchema)
module.exports = commentModel