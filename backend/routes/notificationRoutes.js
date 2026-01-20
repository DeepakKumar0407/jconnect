import express from 'express'
import { getNotification,createNotification } from '../controllers/notificationController.js'
import authenticateToken from '../middleware/tokenVerification.js'

const router = express.Router()

router.get('/',authenticateToken,getNotification)
router.post('/',authenticateToken,createNotification)

export default router