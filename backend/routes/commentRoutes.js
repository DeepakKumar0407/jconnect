import express from 'express'
import {getAllCommentsByPost,getAllCommentsByUser,createReply,createComment,updateComment,deleteComment} from '../controllers/commentController.js'

const router = express.Router()

router.get('/:id/post',getAllCommentsByPost)
router.get('/:id/user',getAllCommentsByUser)
router.post('/',createComment)
router.post('/:id/comment',createReply)
router.patch('/:id',updateComment)
router.delete('/:id',deleteComment)

export default router