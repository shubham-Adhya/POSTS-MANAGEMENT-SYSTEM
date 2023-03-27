const express = require("express")
const postRouter = express.Router();
const { PostModel } = require("../model/posts.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


// add post
postRouter.post("/add",async (req,res)=>{
    try {
        const post=new PostModel(req.body);
        await post.save()
        res.status(200).json({"msg":"A new post has been created"})
    } catch (error) {
        res.status(400).json({"msg":error.message})
    }
})

//get all posts
postRouter.get("/")

module.exports={
    postRouter 
}
