import express from 'express'
import { getAllPosts,getAllPostsByUser,getOnePost,createPost,updatePost,deletePost } from '../controllers/postController.js'

const router = express.Router()

router.get('/',getAllPosts)
router.get('/:id/user',getAllPostsByUser)
router.get('/:id',getOnePost)
router.post('/',createPost)
router.patch("/:id",updatePost)
router.delete('/:id',deletePost)

export default router