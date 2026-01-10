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
    id:{
        type:String,
        required:true
    }

},{timestamps:true})

NotificationSchema.index({userId:1});
NotificationSchema.index({id:1});

export const NotificationModel = mongoose.model('Notification',NotificationSchema)