import { RoomModel } from "../models/roomModel.js";

const makeRoom = async (req,res)=>{
    try {
        const data = req.body
        const roomData = JSON.parse(data)
        console.log(typeof(roomData))
        const room = await RoomModel.create(roomData)
        res.status(200).json(room)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export {makeRoom}