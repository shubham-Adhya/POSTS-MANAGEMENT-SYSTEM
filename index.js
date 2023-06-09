const express=require("express")

require("dotenv").config()
const cors=require("cors");
const { connection } = require("./connection/db");
const { userRouter } = require("./routes/users.routes")
const { postRouter } = require("./routes/posts.routes")
const { auth } = require("./middlewares/auth.middleware")

const app=express()
app.use(express.json())
app.use(cors());

app.get("/",(req,res)=>{
    res.status(200).send("Welcome to Posts Management System")
})
app.use("/users",userRouter)

app.use(auth)
app.use("/posts",postRouter)




app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log("Can not Connect to DB")
        console.log(error)
    }
    console.log(`Server is running at PORT ${process.env.port}`)
})