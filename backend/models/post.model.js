import mongoose,{Schema} from 'mongoose'

const PostSchema = new Schema({
    textContent:{
        type:String,
        required:true,
    },
    imageContent:{
        type:String
    },
    videoContent:{
        type:String
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
    },
    likes:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    likesCount:{
        type:Number,
        default:0
    },
    commentCount:{
        type:Number,
        default:0
    },

},{timestamps:true})


PostSchema.index({userId:1});
PostSchema.index({ userId: 1, createdAt: -1 });
PostSchema.index({ likesCount: -1, createdAt: -1 });

export const PostModel = mongoose.model('Post',PostSchema)