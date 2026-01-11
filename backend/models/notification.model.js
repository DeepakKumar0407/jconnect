import mongoose,{Schema} from "mongoose";

const NotificationSchema = new Schema({
    type:{
        type:String,
        enum:['comment','like'],
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    postId:{
        type:Schema.Types.ObjectId,
        ref:'Post',
        required:true
    },
    notifOnid:{
        type:String,
        required:true
    },
    notifContent:{
        type:Schema.Types.ObjectId,
        ref:'Comment',
    },
    notifForid:{
        type:Schema.Types.ObjectId,
        required:'User'
    },
    

},{timestamps:true})

NotificationSchema.index({userId:1});
NotificationSchema.index({id:1});

export const NotificationModel = mongoose.model('Notification',NotificationSchema)