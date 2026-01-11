import express from 'express'
import {getAllCommentsByPost,getAllCommentsByUser,createReply,createComment,updateComment,deleteComment, updateLike, getLike, getSingleComment} from '../controllers/commentController.js'
import multer from 'multer'

const router = express.Router()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});
router.get('/:id/post',getAllCommentsByPost)
router.get('/:id/user',getAllCommentsByUser)
router.get('/:id/comment',getSingleComment)
router.get('/:id/like',getLike)
router.post('/',upload.single('imageContent'),createComment)
router.post('/:id/reply',upload.single('imageContent'),createReply)
router.patch('/:id',updateComment)
router.patch('/:id/like',updateLike)
router.delete('/:id',deleteComment)

export default router