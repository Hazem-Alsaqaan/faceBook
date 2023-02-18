const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const bodyParser = require("body-parser");
const helmet = require("helmet")
const db = require("./db")
const ApiError = require("./src/utilities/ApiError")
const {userRouter} = require("./src/routes/userRouter")

const app = express();

//add cors & helmet
app.use(helmet())
app.use(cors())
//handle middleware
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
// config dotenv
dotenv.config({
    path: ".env"
})
const PORT = process.env.PORT
// handle global route
app.use("/api/v1/user", userRouter);
app.all("*", (req, res, next)=>{
    next(new ApiError(`this route ${req.originalUrl} is not correct`, 404))
})
// handle global error
app.use((err, req, res, next)=>{
    res.status(err.statusCode).json({
        message: err.message,
        stack: err.stack
    })
})

// server listener
    app.listen(process.env.PORT || 3500, ()=>{
        console.log("server is running..............")
    })
