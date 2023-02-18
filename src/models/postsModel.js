const mongoose = require("mongoose")

const postsSchema = new mongoose.Schema({
        content:{
            type: String,
            required: true
        },
        image:{
            type: String,
        },
        like:{
            type: Number,
        },
        share: {
            type: Number,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        }
},{timestamps: true})
const postsModel = mongoose.model("posts", postsSchema);
module.exports = {postsModel}