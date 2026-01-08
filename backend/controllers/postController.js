import { PostModel } from "../models/post.model.js"

const getAllPosts= async (req,res)=>{
    try {
        const post = await PostModel.find()
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const getAllPostsByUser=async(req,res)=>{
    try {
        const id = req.params.id
        const post = await PostModel.find({userId:id})
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const getOnePost= async (req,res)=>{
    try {
        const id = req.params.id
        const post = await PostModel.findOne({_id:id})
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const createPost=async(req,res)=>{
   try {
        const data = req.body
        const post = await PostModel.create(data)
        res.status(200).json(post)
   } catch (error) {
        console.log(error)
        res.status(500).json(error)
   }
}

const updatePost=async(req,res)=>{
    try {
        const id = req.params.id
        const data = req.body
        const post = await PostModel.updateOne({_id:id},data)
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const deletePost=async(req,res)=>{
    try {
        const id = req.params.id
        const post = await PostModel.deleteOne({_id:id})
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export {getAllPosts,getAllPostsByUser,getOnePost,createPost,updatePost,deletePost}