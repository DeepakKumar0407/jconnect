import { NotificationModel } from "../models/notification.model.js";

const getNotification = async(req,res)=>{
    try {
        const {userId,postId} = req.body
        const notification = await NotificationModel.findOne({userId:userId,id:postId}).sort({createdAt:1})
        res.status(200).json('success')
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const createNotification = async(req,res)=>{
    try {
        const data = req.body
        const notification = await NotificationModel.create(data)
        res.status(200).json('success')
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
    
}

export {getNotification,createNotification}