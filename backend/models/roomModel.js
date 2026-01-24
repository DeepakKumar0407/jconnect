import mongoose,{Schema} from 'mongoose'

const RoomSchema = new Schema({
    senderId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    receiverId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
},{timestamps:true})

RoomSchema.index({senderId:1})
RoomSchema.index({senderId:1,receiverId:1},{unique:1})

export const RoomModel = mongoose.model('Room',RoomSchema)