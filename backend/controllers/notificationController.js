import { NotificationModel } from "../models/notification.model.js";
import { UserModel } from "../models/user.model.js";

const getNotification = async(req,res)=>{
    try {
        const userEmail = req.user.userEmail
        const userId = await UserModel.findOne({email:userEmail},{_id:1})
        const notification = await NotificationModel.find({notifForid:userId._id}).sort({createdAt:-1})
        res.status(200).json(notification)
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