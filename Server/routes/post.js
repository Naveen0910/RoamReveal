import express from 'express'
import formidable from 'express-formidable'

import { requireSignin } from '../middlewares/auth.js'
import {createPost} from '../controllers/post.js'

const router = express.Router()

router.post('/uploads' , requireSignin ,formidable() , createPost)

export default router