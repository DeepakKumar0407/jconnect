import express from 'express'
import { getChat } from '../controllers/chatController.js'

const router = express.Router()

router.get('/:id',getChat)

export default router