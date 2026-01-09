import { PostModel } from "../models/post.model.js"
import {v2 as cloudinary} from 'cloudinary'
import streamifier from "streamifier";

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
        const {textContent} = req.body
        const {imageContent,videoContent} = req.files
        let imageUrl = null
        let videoUrl = null
        if(imageContent){
            imageUrl = await new Promise((resolve,reject)=>{
               const stream = cloudinary.uploader.upload_stream(({folder:'posts',resource_type:'image'}),(error,result)=>{
                    if(error) reject(error)
                    if(!result.secure_url) return reject(new Error("No URL"))
                    resolve(result.secure_url)
               })
               streamifier.createReadStream(imageContent[0].buffer).pipe(stream)
            })
        }
        if(videoContent){
            videoUrl = await new Promise((resolve,reject)=>{
                const stream = cloudinary.uploader.upload_stream(({folder:'posts',resource_type:'video'}),(error,result)=>{
                    if(error) reject(error)
                    if(!result.secure_url) return reject(new Error("No URL"))
                    resolve(result.secure_url)
                })
                streamifier.createReadStream(videoContent[0].buffer).pipe(stream)
            })
        }
        // const post = await PostModel.create(data)
        console.log(textContent,imageContent[0],videoContent[0])
        res.status(200).json("")
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