import express from 'express'
import {getAllUser,createUser,updateUser,deleteUser,getLikedPosts,getAllFriends,updateSavedStatus, getSavedPosts, getSearchUsers,updateFollowers, getOneUserByEmail, getOneUserById } from '../controllers/userController.js'

const router = express.Router()

router.get('/',getAllUser)
router.get('/:blob/search',getSearchUsers)
router.get('/friends',getAllFriends)
router.get('/:email/email',getOneUserByEmail)
router.get('/:id/id',getOneUserById)
router.get('/:id/liked',getLikedPosts)
router.get('/:id/saved',getSavedPosts)
router.post('/',createUser)
router.patch("/:id",updateUser)
router.patch('/:flag/follow',updateFollowers)
router.patch('/:id/save',updateSavedStatus)
router.delete('/:id',deleteUser)

export default router