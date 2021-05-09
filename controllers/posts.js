import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
export const getPosts=async (req,res)=>{
    try{
        const postMessage=await PostMessage.find();
        res.status(200).json(postMessage);
    }
    catch(error){
        res.status(404).json({message:"erroe"});
    }
}
export const createPost=async(req,res)=>{
    const post=req.body;
    const newPost=new PostMessage(post);
    try{
        await newPost.save();
        res.status(201).json(newPost);
    }
    catch(error){
        res.status(404).json({message:"post error"});
    }
}
export const updatePost= async(req,res)=>{
    const {id:_id}=req.params;
    const post=req.body;
    
    if(!mongoose.Types.ObjectId(_id)) return res.status(404).send("no post with that id");
     const updatedPost=await PostMessage.findOneAndUpdate(_id,{...post,_id},{new:true});
     res.json(updatePost);
}
export const deletePost= async(req,res)=>{
    const {id:_id}=req.params;
    if(!mongoose.Types.ObjectId(id)) return res.status(404).send("no post with that id");
    await PostMessage.findOneAndDelete(id);
    res.json({message:"Post deleted Sucessfully"});

}
export const likePost =async(req,res)=>{
    const {id:_id}=req.params;
    if(!mongoose.Types.ObjectId(id)) return res.status(404).send("no post with that id");
    const post=await PostMessage.findById(id);
    const updatedPost=await PostMessage.findById(id,{likeCount:post.likeCount+1},{new:true});
    res.json(updatePost);
}