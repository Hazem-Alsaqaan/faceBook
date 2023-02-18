const userRouter = require("express").Router()
const { register, login, deleteUser, getUsers, getUser, updateUser } = require("../controller/userController")
const { postsRouter } = require("./postsRouter")


userRouter.post("/register",  register)
userRouter.post("/login", login )
userRouter.put("/:id", updateUser )
userRouter.delete("/:id", deleteUser)
userRouter.get("/:id", getUser)
userRouter.get("/",  getUsers)
//posts
userRouter.use("/:id/posts", postsRouter)

module.exports = {userRouter}
