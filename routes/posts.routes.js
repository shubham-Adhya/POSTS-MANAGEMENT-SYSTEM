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
postRouter.get("/",async(req,res)=>{
    const token=req.headers.authorization.split(" ")[1]
    const decoded= jwt.verify(token,'masai')
    try {
        if(decoded){
            const posts = await PostModel.find({userID:decoded.userID})
            res.status(200).json(posts)
        }else{
            res.status(400).json({"msg":"No post has been created by the user"})
        }
        
    } catch (error) {
        res.status(400).json({"msg":error.message})
    }
})


//update
postRouter.patch("/update/:postID",async(req,res)=>{
    const token=req.headers.authorization.split(" ")[1]
    const decoded= jwt.verify(token,'masai')
    const postID=req.params.postID
    const payload=req.body;
    try {
        if(decoded){
            await PostModel.findByIdAndUpdate({_id:postID,userID:decoded.userID},payload)
            res.status(200).json({"msg":"Post has been updated"})
        }else{
            res.status(400).json({"msg":"Authorization Failed !"})
        }
    } catch (error) {
        res.status(400).json({"msg":error.message}) 
    }
})

//delete
postRouter.delete("/delete/:postID",async(req,res)=>{
    const token=req.headers.authorization.split(" ")[1]
    const decoded= jwt.verify(token,'masai')
    const postID=req.params.postID
    try {
        if(decoded){
            await PostModel.findOneAndDelete({_id:postID,userID:decoded.userID})
            res.status(200).json({"msg":"Post has been deleted"})
        }else{
            res.status(400).json({"msg":"Authorization Failed !"})
        }
    } catch (error) {
        res.status(400).json({"msg":error.message}) 
    }
})

module.exports={
    postRouter 
}
