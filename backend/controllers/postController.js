import { userInfo } from "node:os";
import { PostModel } from "../models/post.model.js"
import {UserModel} from "../models/user.model.js"
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
        const post = await PostModel.find({email:id})
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
        const email = "deepak.kumar016211@gmail.com"
        const data = req.body
        const {imageContent,videoContent} = req.files
        let imageUrl = null
        let videoUrl = null
        const user = await UserModel.findOne({email:email})
        data.userId  = user._id
        data.userName = user.userName
        data.profilePic = user.profilePic
        if(imageContent){
            imageUrl = await new Promise((resolve,reject)=>{
               const stream = cloudinary.uploader.upload_stream(({folder:'posts',resource_type:'image'}),(error,result)=>{
                    if(error) reject(error)
                    if(!result.secure_url) return reject(new Error("No URL"))
                    resolve(result.secure_url)
               })
               streamifier.createReadStream(imageContent[0].buffer).pipe(stream)
            })
            data.imageContent = imageUrl
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
            data.videoContent = videoUrl
        }
        const post = await PostModel.create(data)
        res.status(200).json("success")
   } catch (error) {
        console.log(error)
        res.status(500).json(error)
   }
}

const updatePost=async(req,res)=>{
    try {
        const email = req.params.id
        const data = req.body
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
            data.imageContent = imageUrl
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
            data.videoContent = videoUrl
        }
        const post = await PostModel.updateOne({email:email},data)
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const updateLike = async(req,res)=>{
    try {
        const postId = req.params.id
        const email = 'deepak.kumar016211@gmail.com'
        const user = await UserModel.findOne({email:email},{_id:1})
        const post = await PostModel.findOneAndUpdate(
            {_id:postId,likes:{$ne:user._id}},
            {
            $addToSet: { likes: user._id },
            $inc: { likesCount: 1 }
            },
            { new: true }
        );
        if(post){
            await UserModel.findByIdAndUpdate(
                user._id,
                {$addToSet:{likedPosts:post._id}}
            )
        }
        res.status(200).json('success')
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

export {getAllPosts,getAllPostsByUser,getOnePost,createPost,updatePost,deletePost,updateLike}