const { getPosts, addPost, deletePost, updatePost, getOnePost } = require("../controller/postsController");
const { commentRouter } = require("./commentRouter");

const postsRouter = require("express").Router()

postsRouter.get("/", getPosts);
postsRouter.post("/", addPost);
postsRouter.delete("/:id", deletePost);
postsRouter.put("/:id", updatePost);
postsRouter.get("/:id", getOnePost)

// got to comment route if
postsRouter.use("/:id/comments", commentRouter)

module.exports = {postsRouter}