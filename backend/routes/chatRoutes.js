import express from 'express'
import { deleteChat, getChat } from '../controllers/chatController.js'

const router = express.Router()

router.get('/:id',getChat)
router.delete('/:id',deleteChat)

export default router