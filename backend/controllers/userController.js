import { UserModel } from "../models/user.model.js"
import bcrypt from 'bcrypt'

const getAllUser= async (req,res)=>{
    try {
        const user = await UserModel.find()
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const getSearchUsers = async (req,res)=>{
    try {
        const blob = req.params.blob
        const users = await UserModel.find({$or:[{name:{$regex:blob,$options:'i'}},{userName:{$regex:blob,$options:'i'}},{email:{$regex:blob,$options:'i'}}]})
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const getAllFriends= async (req,res)=>{
    try {
        const email = "deepak.kumar016211@gmail.com"
        const followers = await UserModel.find({email:email},{followers:1})
        const following = await UserModel.find({email:email},{following:1})
        res.status(200).json(followers,following)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const getOneUser= async (req,res)=>{
    try {
        const id = req.params.id
        const user = await UserModel.findOne({email:id})
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const loginUser= async(req,res)=>{
    try {
        const data = req.body
        const user = await UserModel.findOne({email:data.email})
        if(!user){
            throw new Error('Invalid Credentials')
        }
        const isPassword = await bcrypt.compare(data.password,user.password)
        if(!isPassword){
            throw new Error('Invalid Credentials')
        }
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
        const user = await UserModel.findById(id).populate('savedPosts')
        const savedPosts = user.savedPosts
        console.log(savedPosts)
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

const updateUser=async(req,res)=>{
    try {
        const id = req.params.id
        const data = req.body
        if(typeof(data)==='string'){
        const user = await UserModel.findOne({email:id},{password:1})
        const isPassword = await bcrypt.compare(data,user.password)
        if(!isPassword){
            throw new Error('invalid password')
        }
        res.status(200).json("success")
        }else{
        const user = await UserModel.updateOne({email:id},data)
        res.status(200).json("success")
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const updateSavedStatus = async(req,res)=>{
    try {
        const postId = req.params.id
        const email = "deepak.kumar016211@gmail.com"
        const isSaved = await UserModel.exists({email:email,savedPosts:postId})
        console.log(isSaved)
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

export {getAllUser,getOneUser,createUser,updateUser,deleteUser,getLikedPosts, loginUser,getAllFriends,updateSavedStatus,getSavedPosts,getSearchUsers}