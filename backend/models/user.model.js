import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:String,
        required:[true,"Phone is required"],
        validate:{
            validator:(v) => /^\d{10}$/.test(v),
            message:"Number munst be 10 digits"
        }
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    dob:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
    },
    bio:{
        type:String
    },
    followers:[
        {
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    following:[
        {
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    likedPosts:[
        {
        type:Schema.Types.ObjectId,
            ref:"Post"
    }
],
    savedPosts:[
            {
            type:Schema.Types.ObjectId,
                ref:"Post"
        }
    ],
    postCount:{
        type:Number,
        default:0
    }

},{timestamps:true})

UserSchema.pre('save',async function(){
    try {
        if (!this.isModified('password')) return
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password,salt)
    } catch (error) {
        console.log(error)
    }
})
UserSchema.pre('updateOne',async function(){
    try {
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(this.getUpdate().password||this.getUpdate().$set?.password,salt)
        if (this.getUpdate().password) {
            this.getUpdate().password = password;
        } else {
            this.getUpdate().$set.password = password;
        }
    } catch (error) {
        console.log(error)
    }
})

UserSchema.index({ phone: 1 }, { unique: true })


export const UserModel = mongoose.model('User',UserSchema)