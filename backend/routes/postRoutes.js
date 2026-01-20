import express from 'express'
import { getAllPosts,getAllPostsByUser,getOnePost,createPost,updatePost,deletePost,updateLike,getLike, getSearchPosts } from '../controllers/postController.js'
import multer from 'multer'
import authenticateToken from '../middleware/tokenVerification.js'

const router = express.Router()
const upload = multer({
    storage:multer.memoryStorage(),
    limits:{ fileSize: 100 * 1024 * 1024 }
})
router.get('/',authenticateToken, getAllPosts)
router.get('/:id/user',authenticateToken,getAllPostsByUser)
router.get('/:blob/search',authenticateToken,getSearchPosts)
router.get('/:id',authenticateToken,getOnePost)
router.get('/:id/like',authenticateToken,getLike)
router.post('/',upload.fields([{name:"imageContent",maxCount:1},{name:"videoContent",maxCount:1}]),authenticateToken,createPost)
router.patch("/:id",upload.fields([{name:"imageContent",maxCount:1},{name:"videoContent",maxCount:1}]),authenticateToken,updatePost)
router.patch('/:id/like',authenticateToken,updateLike)
router.delete('/:id',authenticateToken,deletePost)

export default router