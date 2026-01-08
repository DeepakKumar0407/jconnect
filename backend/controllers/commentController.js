import {CommentModel} from "../models/comment.model.js"


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
        const data = req.body
        const comment = await CommentModel.create(data)
        res.status(200).json(comment)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const createReply = async()=>{
    try {
        const id = req.params.id
        const data = req.body
        const reply = await CommentModel.create({...data,parentId:id})
        res.status(200).json(reply)
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