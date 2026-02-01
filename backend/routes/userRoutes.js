import express from 'express'
import {getAllUser,createUser,updateUser,deleteUser,getLikedPosts,getAllFriends,updateSavedStatus, getSavedPosts, getSearchUsers,updateFollowers, getOneUserByEmail, getOneUserById, comparePassword, getAllFollowers, getAllFollowing } from '../controllers/userController.js'
import authenticateToken from '../middleware/tokenVerification.js'
import multer from 'multer'

const router = express.Router()
const upload = multer({
    storage:multer.memoryStorage(),
    limits:{ fileSize: 100 * 1024 * 1024 }
})

router.get('/',authenticateToken, getAllUser)
router.get('/:blob/search',authenticateToken,getSearchUsers)
router.get('/:id/friends',authenticateToken,getAllFriends)
router.get('/:id/followers',authenticateToken,getAllFollowers)
router.get('/:id/following',authenticateToken,getAllFollowing)
router.get('/:email/email',authenticateToken,getOneUserByEmail)
router.get('/:id/id',authenticateToken,getOneUserById)
router.get('/:id/liked',authenticateToken,getLikedPosts)
router.get('/:id/saved',authenticateToken,getSavedPosts)
router.post('/',createUser)
router.post('/password',authenticateToken,comparePassword)
router.patch("/:id",upload.single('profilePic'),authenticateToken,updateUser)
router.patch('/:flag/follow',authenticateToken,updateFollowers)
router.patch('/:id/save',authenticateToken,updateSavedStatus)
router.delete('/:id',authenticateToken,deleteUser)

export default router