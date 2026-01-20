import { UserModel } from "../models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const loginUser= async(req,res)=>{
    try {
        const jwt_secret = process.env.JWT_SECRET
        const data = req.body
        const user = await UserModel.findOne({email:data.email})
        if(!user){
            throw new Error('Invalid Credentials')
        }
        const isPassword = await bcrypt.compare(data.password,user.password)
        if(!isPassword){
            throw new Error('Invalid Credentials')
        }
        const userStructure = {
            signInTime: Date.now(),
            username: user.userName,
            userId: user._id,
            userEmail:user.email
        }
        const token = jwt.sign(userStructure,jwt_secret)
        console.log(token)
        res.status(200).json(token)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export {loginUser}