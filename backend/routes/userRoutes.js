import express from 'express'
import { getOneUser,getAllUser,createUser,updateUser,deleteUser,getLikedPosts,loginUser,getAllFriends,updateSavedStatus, getSavedPosts } from '../controllers/userController.js'

const router = express.Router()

router.get('/',getAllUser)
router.get('/friends',getAllFriends)
router.get('/:id',getOneUser)
router.get('/:id/liked',getLikedPosts)
router.get('/:id/liked',getSavedPosts)
router.post('/login',loginUser)
router.post('/',createUser)
router.patch("/:id",updateUser)
router.patch('/:id/save',updateSavedStatus)
router.delete('/:id',deleteUser)

export default router