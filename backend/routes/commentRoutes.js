import express from 'express'
import {getAllCommentsByPost,getAllCommentsByUser,createComment,updateComment,deleteComment, updateLike, getLike, getSingleComment} from '../controllers/commentController.js'
import multer from 'multer'
import authenticateToken from '../middleware/tokenVerification.js';

const router = express.Router()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});
router.get('/:id/post',authenticateToken,getAllCommentsByPost)
router.get('/:id/user',authenticateToken,getAllCommentsByUser)
router.get('/:id/comment',authenticateToken,getSingleComment)
router.get('/:id/like',authenticateToken,getLike)
router.post('/',upload.single('imageContent'),authenticateToken,createComment)
router.patch('/:id',upload.single('imageContent'),authenticateToken,updateComment)
router.patch('/:id/like',authenticateToken,updateLike)
router.delete('/:id',authenticateToken,deleteComment)

export default router