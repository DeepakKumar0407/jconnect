import { ChatModel } from "../models/chat.model.js";

const getChat = async(req,res)=>{
    try {
        const id = req.params.id
        const chats = await ChatModel.find({roomId:id})
        res.status(200).json(chats)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export {getChat}