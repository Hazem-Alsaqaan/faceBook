const { findAComment, getComments, updateComment, addComment, deleteComment } = require("../controller/commentController");

const commentRouter = require("express").Router();

commentRouter.post("/", addComment)
commentRouter.get("/", getComments)
commentRouter.put("/:id", updateComment)
commentRouter.delete("/:id", deleteComment)
commentRouter.get("/:id", findAComment)

module.exports = {commentRouter}