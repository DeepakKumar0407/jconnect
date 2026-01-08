import mongoose,{Schema} from 'mongoose'

const CommentSchema = new Schema({
    textContent:{
        type:String,
        required:true,
    },
    imageContent:{
        type:String
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
    parentId:{
        type:Schema.Types.ObjectId,
        ref:'Comment',
        default:null
    },
    likes:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    likesCount:{
        type:Number,
        default:0
    },

},{timestamps:true})


CommentSchema.index({userId:1});
CommentSchema.index({ postId:1 });
CommentSchema.index({ likesCount: -1, createdAt: -1 });
CommentSchema.index({ parentId: 1, createdAt: 1 });
CommentSchema.index({ userId: 1, postId: 1, createdAt: -1 });


export const CommentModel = mongoose.model('Comment',CommentSchema)