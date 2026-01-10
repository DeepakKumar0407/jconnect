import express from 'express'
import { getOneUser,getAllUser,createUser,updateUser,deleteUser,getLikedPosts,loginUser,getAllFriends } from '../controllers/userController.js'

const router = express.Router()

router.get('/',getAllUser)
router.get('/friends',getAllFriends)
router.get('/:id',getOneUser)
router.get('/:id/liked',getLikedPosts)
router.post('/login',loginUser)
router.post('/',createUser)
router.patch("/:id",updateUser)
router.delete('/:id',deleteUser)

export default router