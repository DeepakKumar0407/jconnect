import {CommentModel} from "../models/comment.model.js"
import {PostModel} from "../models/post.model.js"
import { NotificationModel } from "../models/notification.model.js";
import {UserModel} from '../models/user.model.js'
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

const getSingleComment = async(req,res)=>{
    try {
        const commentId = req.params.id
        const commnet = await CommentModel.findOne({_id:commentId})
        res.status(200).json(commnet)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const getLike = async(req,res)=>{
    try {
        const commentId = req.params.id
        const email = req.user.userEmail
        const user = await UserModel.findOne({email:email},{_id:1})
        const likeStatus = await CommentModel.exists({_id:commentId,likes:user._id})
        res.status(200).json(likeStatus)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const createComment =async(req,res)=>{
    try {
        const userId = req.user.userId
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
        const postId = comment.postId
        const parentId = comment.parentId
        if(parentId===null){
            const postUserId = await PostModel.findOne({_id:postId},{userId:1})
            const notificationData = {
            type:'comment',
            userId:userId,
            postId:postId,
            notifOnid:postId,
            notifContent:comment._id,
            notifForid:postUserId.userId
            }
            const notification = await NotificationModel.create(notificationData)
        }else{
            const commentUserId = await CommentModel.findOne({_id:parentId},{userId:1})
            const notificationData = {
            type:'comment',
            userId:userId,
            postId:postId,
            notifOnid:parentId,
            notifContent:comment._id,
            notifForid:commentUserId.userId
            }
            const notification = await NotificationModel.create(notificationData)
        }
        res.status(200).json('success')
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}


const updateComment = async(req,res)=>{
  try {
        const commentId = req.params.id
        const data = {...req.body}
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
        const comment = await CommentModel.findOneAndUpdate({_id:commentId},data)
        res.status(200).json('success')
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const updateLike = async(req,res)=>{
    try {
        const commentId = req.params.id
        const email = req.user.userEmail
        const user = await UserModel.findOne({email:email},{_id:1})
        const checkLike = await CommentModel.exists({_id:commentId,likes:user._id})
        if(checkLike===null){
            const comment = await CommentModel.findOneAndUpdate(
            {_id:commentId,likes:{$ne:user._id}},
            {
            $addToSet: { likes: user._id },
            $inc: { likesCount: 1 }
            },
            { new: true }
        );
        if(comment){
            const commentUserId = await CommentModel.findOne({_id:commentId},{userId:1,postId:1})
            const notificationData = {
                type:'like',
                userId:user._id,
                postId:commentUserId.postId,
                notifOnid:commentId,
                notifForid:commentUserId.userId
            }
            const notification = await NotificationModel.create(notificationData)
        }
        }else{
            const comment = await CommentModel.findOneAndUpdate(
            {_id:commentId,likes:{$eq:user._id}},
            {
            $pull: { likes: user._id },
            $inc: { likesCount: -1 }
            },
            { new: true }
        )
        }
        res.status(200).json('success')
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const deleteComment = async(req,res)=>{
    try {
    const id = req.params.id
    const comment = await CommentModel.deleteOne({_id:id})
    res.status(200).json(comment)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export {getAllCommentsByPost,getAllCommentsByUser,createComment,updateComment,deleteComment,updateLike,getLike,getSingleComment}