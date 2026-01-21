import express from 'express'
import {getAllUser,createUser,updateUser,deleteUser,getLikedPosts,getAllFriends,updateSavedStatus, getSavedPosts, getSearchUsers,updateFollowers, getOneUserByEmail, getOneUserById } from '../controllers/userController.js'
import authenticateToken from '../middleware/tokenVerification.js'

const router = express.Router()

router.get('/',authenticateToken, getAllUser)
router.get('/:blob/search',authenticateToken,getSearchUsers)
router.get('/:id/friends',authenticateToken,getAllFriends)
router.get('/:email/email',authenticateToken,getOneUserByEmail)
router.get('/:id/id',authenticateToken,getOneUserById)
router.get('/:id/liked',authenticateToken,getLikedPosts)
router.get('/:id/saved',authenticateToken,getSavedPosts)
router.post('/',authenticateToken,createUser)
router.patch("/:id",authenticateToken,updateUser)
router.patch('/:flag/follow',authenticateToken,updateFollowers)
router.patch('/:id/save',authenticateToken,updateSavedStatus)
router.delete('/:id',authenticateToken,deleteUser)

export default router