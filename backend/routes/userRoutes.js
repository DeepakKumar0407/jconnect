import express from 'express'
import { getOneUser,getAllUser,createUser,updateUser,deleteUser } from '../controllers/userController.js'

const router = express.Router()

router.get('/',getAllUser)
router.get('/:id',getOneUser)
router.post('/',createUser)
router.patch("/:id",updateUser)
router.delete('/:id',deleteUser)

export default router