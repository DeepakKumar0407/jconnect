import express from 'express'
import { getAllPosts,getAllPostsByUser,getOnePost,createPost,updatePost,deletePost,updateLike } from '../controllers/postController.js'
import multer from 'multer'

const router = express.Router()
const upload = multer({
    storage:multer.memoryStorage(),
    limits:{ fileSize: 100 * 1024 * 1024 }
})
router.get('/',getAllPosts)
router.get('/:id/user',getAllPostsByUser)
router.get('/:id',getOnePost)
router.post('/',upload.fields([{name:"imageContent",maxCount:1},{name:"videoContent",maxCount:1}]),createPost)
router.patch("/:id",upload.fields([{name:"imageContent",maxCount:1},{name:"videoContent",maxCount:1}]),updatePost)
router.patch('/:id/like',updateLike)
router.delete('/:id',deletePost)

export default router