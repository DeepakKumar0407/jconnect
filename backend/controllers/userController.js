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

export {getAllUser,getOneUser,createUser,updateUser,deleteUser,getLikedPosts, loginUser}