import mongoose,{Schema} from 'mongoose'

const ChatSchema = new Schema({
    senderId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    roomId:{
        type:Schema.Types.ObjectId,
        ref:'Room',
        required:true
    },
    text:{
        type:String,
        required:true
    }
},{timestamps:true})

ChatSchema.index({senderId:1})

export const ChatModel = mongoose.model('Chat',ChatSchema)