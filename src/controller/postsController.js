const { postsModel } = require("../models/postsModel")
const ApiError = require("../utilities/ApiError")

//get posts
const getPosts = async(req, res, next)=>{
    const filterUser = {}
    if(req.params.id){
        filterUser = {user: req.params.id}
    }
    // const {user} = req.body
    try{
        const posts = await postsModel.find(filterUser).populate({path: "user"})
        res.status(200).json(posts)
    }catch(err){
        next(new ApiError(`error from server to get posts ${err.message}`))
    }
}
//add new post
const addPost = async(req, res, next)=>{
    const {content, image, like, share, comments, user} = req.body
    try{
        const newPost = await postsModel.create(
            {content, image, like, share, comments, user}
        )
        res.status(200).json(newPost)
    }catch(err){
        next(new ApiError(`error from server to create new post ${err.message}`, 400))
    }
}
//delete post 
const deletePost = async(req, res, next)=>{
    const {id} = req.params
    try{
        const deletedPost = await postsModel.findByIdAndDelete(id);
        res.status(200).json(deletedPost)
    }catch(err){
        next(new ApiError(`error from server to delete this post ${err.message}`, 400))
    }
}
//update post 
const updatePost = async(req, res, next)=>{
    const {id} = req.params
    const  {
        content,
        image,
        like,
        share,
        comments
    } = req.body
    try{
        const postUpdated = await postsModel.findByIdAndUpdate(
            id, 
            {
                content,
                image,
                like,
                share,
                comments
            },
            {new: true}
        )
        res.status(200).json(postUpdated)
    }catch(err){
        next(new ApiError(`error from server to update post ${err.message}`, 400))
    }
}
// Get One Post 
const getOnePost = async (req, res, next)=>{
    const {id} = req.params
    try{
        const onePost = await postsModel.findById(id)
        res.status(200).json(onePost)
    }catch(err){
        next (new ApiError(`error from server to get this post ${err.message}`, 400))
    }
}

module.exports = {
    getPosts,
    addPost,
    deletePost,
    updatePost,
    getOnePost
}