const commentModel = require("../models/commentModel")
const ApiError = require("../utilities/ApiError")

// create comment
const addComment = async (req, res, next)=>{
    const {comment, posts, user} = req.body
    try{
        const newComment = await commentModel.create({comment, posts, user})
        res.status(200).json(newComment)
    }catch(err){
        next (new ApiError(`error to create new comment ${err.message}`, 400))
    }
}
//get comments
const getComments = async (req, res, next)=>{
    const filterPost = {}
        if(req.params.id){
            filterPost = {posts: req.params.id}
        }
    try{
        const comments = await commentModel.find(filterPost).populate({path: "posts"}).populate({path: "user"})
        res.status(200).json(comments)
    }catch(err){
        next (new ApiError(`error to get comments ${err.message}`, 400))
    }
}
//update comment
const updateComment = async(req, res, next)=>{
    const {id} = req.params
    const {comment} = req.body
    try{
        const commentUpdated = await commentModel.findByIdAndUpdate(
            id,
            {comment},
            {new: true}
            )
        res.status(200).json(commentUpdated)
    }catch(err){
        next (new ApiError(`error to update comment ${err.message}`, 400))
    }
}
//delete comment
const deleteComment = async(req, res, next)=>{
    const {id} = req.params
    try{
        const commentDeleted = await commentModel.findByIdAndDelete(id);
        res.status(200).json(commentDeleted)
    }catch(err){
        next (new ApiError(`error to deleted comment ${err.message}`, 400))
    }
}
//find a comment
const findAComment = async(req, res, next)=>{
    const {id} = req.params
    try{
        const commentFound = await commentModel.findById(id).populate({path: "posts"}).populate({path: "user"})
        res.status(200).json(commentFound)
    }catch(err){
        next (new ApiError(`error to find a comment ${err.message}`, 400))
    }
}
module.exports = {
    addComment,
    getComments,
    updateComment,
    deleteComment,
    findAComment
}