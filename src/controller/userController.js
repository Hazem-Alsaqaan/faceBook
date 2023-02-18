const { userModel } = require("../models/usersModel")
const { ApiError } = require("../utilities/ApiError")
const bcrypt = require("bcrypt")

// register new user
const register = async(req, res, next)=>{
    let {userName, email, password} = req.body
    try{
        const user = await userModel.findOne({email})
        if(user){
            res.status(400).json("this email is already found")
        }else{
            const saltRound = 10
            const salt = await bcrypt.genSalt(saltRound)
            password = await bcrypt.hash(password, salt)
            const newUser = await userModel.create({userName, email, password})
            return res.status(200).json(newUser)
        }
    }catch(err){
        next(new ApiError(`can't register user ${err}`, 400))
    }
}
//login user
const login = async(req, res, next)=>{
    const {email, password} = req.body
    try{
        const loggingUser = await userModel.findOne({email})
        if(!loggingUser){
            res.status(404).json("this email didn't register")
        }else{
            const checkPassword = await bcrypt.compare(password, loggingUser.password)
            if(!checkPassword){
                res.status(404).json("check email or password")
            }else{
                return res.status(200).json(loggingUser)
            }
        }
    }catch(err){
        next(new ApiError(`can't login ${err}`, 400))
    }
}
// delete user
const deleteUser = async(req, res, next)=>{
    const {id} = req.params
    try{
        const deletedUser = await userModel.findByIdAndDelete(id)
        res.status(200).json(deletedUser)
    }catch(err){
        next(new ApiError(`can't delete user ${err}`, 400))
    }
}
//get a user
const getUser = async(req, res, next)=>{
    const {id} = req.params
    try{
        const user = await userModel.findById(id)
        if(!user){
            res.status(404).json("this user not fount")
        }else{
            res.status(200).json(user)
        }
    }catch(err){
        next(new ApiError(`can't get this user`, 400))
    }
}
//update user
const updateUser = async (req, res, next)=>{
    const {id} = req.params
    const {
        userName,
        password,
        job,
        photo,
        background_img
    } = req.body
    try{
        const user = await userModel.findByIdAndUpdate(
            id,
            {
                userName,
                password,
                job,
                photo,
                background_img
            },{new: true})
            res.status(200).json(user)
    }catch(err){
        next(new ApiError(`can't update user ${err}`))
    }
}

// get all user
const getUsers = async(req, res, next)=>{
    try{
        const users = await userModel.find()
        if(users){
            res.status(200).json(users)
        }
    }catch(err){
        next(new ApiError(`can't get users ${err}`, 400))
    }
}




module.exports = {
    register,
    login,
    deleteUser,
    getUsers,
    getUser,
    updateUser
}