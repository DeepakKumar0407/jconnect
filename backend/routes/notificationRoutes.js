import express from 'express'
import { getNotification,createNotification } from '../controllers/notificationController.js'

const router = express.Router()

router.get('/',getNotification)
router.post('/',createNotification)

export default router