import { UserModel } from "../models/user.model.js"

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
        const user = await UserModel.findOne({_id:id})
        res.status(200).json(user)
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
        const user = await UserModel.updateOne({_id:id},data)
        res.status(200).json(user)
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

export {getAllUser,getOneUser,createUser,updateUser,deleteUser}