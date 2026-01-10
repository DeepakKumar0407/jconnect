import {CommentModel} from "../models/comment.model.js"
import { NotificationModel } from "../models/notification.model.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

const getAllCommentsByPost=async(req,res)=>{
    try {
        const id = req.params.id
        const comments = await CommentModel.find({postId:id}).sort({createdAt:1})
        res.status(200).json(comments)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}


const getAllCommentsByUser= async(req,res)=>{
    try {
        const id = req.params.id
        const comments = await CommentModel.find({userId:id}).sort({createdAt:1})
        res.status(200).json(comments)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }   
}

const createComment =async(req,res)=>{
    try {
        const userId = '69615b843b9d8533212f8503'
        const data = {...req.body}
        data.userId = userId
        let imageUrl = null
        if(req.file){
            imageUrl = await new Promise((resolve,reject)=>{
                const stream = cloudinary.uploader.upload_stream(({folder:"comment_Images",resource_type:"image"}),(error,result)=>{
                    if(error) reject(error)
                    if(!result.secure_url) return reject(new Error("No URL"))
                    resolve(result.secure_url)
                })
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            })
        }
        data.imageContent = imageUrl
        const comment = await CommentModel.create(data)
        const notificationData = {
            type:'comment',
            userId:userId,
            id:comment._id
        }
        const notification = await NotificationModel.create(notificationData)
        res.status(200).json('success')
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const createReply = async()=>{
    try {
        const id = req.params.id
        const data = req.body
        let imageUrl = null
        if(req.file){
            imageUrl = await new Promise((resolve,reject)=>{
                const stream = cloudinary.uploader.upload_stream(({folder:"comment_Images",resource_type:"image"}),(error,result)=>{
                    if(error) reject(error)
                    if(!result.secure_url) return reject(new Error("No URL"))
                    resolve(result.secure_url)
                })
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            })
        }
        data.imageContent = imageUrl
        const reply = await CommentModel.create({...data,parentId:id})
        const notificationData = {
            type:'comment',
            userId:userId,
            id:comment._id
        }
        const notification = await NotificationModel.create(notificationData)
        res.status(200).json('success')
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const updateComment = async(req,res)=>{
    try {
        const id = req.params.id
        const data = req.body
        const comment = await CommentModel.updateOne({_id:id},data)
        res.status(200).json(comment)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const deleteComment = async()=>{
    try {
    const id = req.params.id
    const comment = await CommentModel.deleteOne({_id:id})
    res.status(200).json(comment)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export {getAllCommentsByPost,getAllCommentsByUser,createComment,updateComment,deleteComment,createReply}