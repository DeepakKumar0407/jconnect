import { UserModel } from "../models/user.model.js"
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import streamifier from "streamifier";

const getAllUser= async (req,res)=>{
    try {
        const user = await UserModel.find().sort({createdAt:-1})
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const getSearchUsers = async (req,res)=>{
    try {
        const blob = req.params.blob
        const users = await UserModel.find({$or:[{name:{$regex:blob,$options:'i'}},{userName:{$regex:blob,$options:'i'}},{email:{$regex:blob,$options:'i'}}]}).sort({createdAt:-1})
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const getAllFriends= async (req,res)=>{
    try {
        const id = req.params.id
        const followers = await UserModel.findOne({_id:id}).populate('followers')
        const following = await UserModel.findOne({_id:id}).populate('following')
        res.status(200).json([...followers.followers,...following.following])
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const getAllFollowers= async (req,res)=>{
    try {
        const id = req.params.id
        const followers = await UserModel.findOne({_id:id}).populate('followers')
        res.status(200).json(followers)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const getAllFollowing= async (req,res)=>{
    try {
        const id = req.params.id
        const following = await UserModel.findOne({_id:id}).populate('following')
        res.status(200).json(following)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const getOneUserByEmail= async (req,res)=>{
    try {
        const userEmail = req.params.email
        const user = await UserModel.findOne({email:userEmail})
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
const getOneUserById= async (req,res)=>{
    try {
        const id = req.params.id
        const user = await UserModel.findOne({_id:id})
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}


const getLikedPosts = async(req,res)=>{
    try {
        const id = req.params.id
        const user = await UserModel.findById(id).populate('likedPosts')
        const likedPosts = user.likedPosts
        res.status(200).json(likedPosts)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}


const getSavedPosts = async(req,res)=>{
      try {
        const id = req.params.id
        const user = await UserModel.findById(id).populate('savedPosts').sort({createdAt:-1})
        const savedPosts = user.savedPosts
        res.status(200).json(savedPosts)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const createUser=async(req,res)=>{
   try {
        const data = req.body
        const user = await UserModel.create(data)
        res.status(200).json(user)
   } catch (error) {
        console.log(error)
        res.status(500).json(error)
   }
}

const comparePassword = async(req,res)=>{
    try {
        const id = req.user.userId
        const data = req.body
        const user = await UserModel.findOne({_id:id},{password:1})
        const isPassword = await bcrypt.compare(data,user.password)
        if(!isPassword){
            throw new Error('invalid password')
        }
        res.status(200).json("success")
    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }
}

const updateUser=async(req,res)=>{
    try {
        const id = req.params.id
        const data = req.body
        const profilePic = req.file
        console.log(typeof(data),data)
        let imageUrl = null
        if(profilePic){
            imageUrl = await new Promise((resolve,reject)=>{
                const stream = cloudinary.uploader.upload_stream(({folder:"profile",resource_type:"image"}),(error,result)=>{
                    if(error) reject(error)
                    if(!result.secure_url) return reject(new Error("No URL"))
                    resolve(result.secure_url)
                })
                streamifier.createReadStream(profilePic.buffer).pipe(stream)
            })
            data.profilePic = imageUrl
        }
        if(typeof(data)==='string'){
            const user = await UserModel.updateOne({email:id},{password:data})
        }else{
        const user = await UserModel.updateOne({email:id},data)
        }
        res.status(200).json("success")
    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }
}

const updateFollowers = async(req,res)=>{
   try {
        const flag = req.params.flag
        const userEmail = req.user.userEmail
        const toFollowId = req.body
        console.log(userEmail,toFollowId)
        const followingUserId = await UserModel.findOne({email:userEmail},{_id:1})
       if(flag==="follow"){
        const followingUser = await UserModel.findOneAndUpdate({email:userEmail},{$addToSet:{following:toFollowId}})
        const followerUser = await UserModel.findOneAndUpdate({_id:toFollowId},{$addToSet:{followers:followingUserId._id}}) 
       }else if(flag==="unfollow"){
        const followingUser = await UserModel.findOneAndUpdate({email:userEmail},{$pull:{following:toFollowId}})
        const followerUser = await UserModel.findOneAndUpdate({_id:toFollowId},{$pull:{followers:followingUserId._id}}) 
       }
        res.status(200).json("success")
   } catch (error) {
        console.log(error)
        res.status(500).json(error)
   }

}

const updateSavedStatus = async(req,res)=>{
    try {
        const postId = req.params.id
        const email = req.user.userEmail
        const isSaved = await UserModel.exists({email:email,savedPosts:postId})
        if(isSaved===null){
        await UserModel.findOneAndUpdate({email:email},{$addToSet:{savedPosts:postId}})
        }else{
        await UserModel.findOneAndUpdate({email:email},{$pull:{savedPosts:postId}})
        }
        res.status(200).json('sucess')
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}

const deleteUser=async(req,res)=>{
    try {
        const id = req.params.id
        const user = await UserModel.deleteOne({_id:id})
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export {getAllUser,getOneUserByEmail,getOneUserById,createUser,updateUser,deleteUser,comparePassword,getLikedPosts,getAllFriends,getAllFollowers,getAllFollowing,updateSavedStatus,getSavedPosts,getSearchUsers,updateFollowers}