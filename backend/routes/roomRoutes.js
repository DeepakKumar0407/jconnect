import express from 'express'
import { makeRoom } from '../controllers/roomController.js'


const router = express.Router()

router.post('/',makeRoom)

export default router