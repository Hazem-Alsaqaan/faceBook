const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config({
    path: ".env"
})
const dbURL = process.env.dbURL
// handle connection with db
mongoose.connect(dbURL)
.then(()=>{
    console.log("server is connecting with db")
})
.catch((err)=>{
    console.log(`server can't connect with db ${err}`)
})
