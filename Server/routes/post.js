import express from 'express'
import { create , readPostByPid, readPostByUid,updateByPid} from '../controllers/post.js';
const router = express.Router();

router.post('/upload' , create)
router.get("/:pid" , readPostByPid)
router.get("/user/:uid" , readPostByUid)
router.put('/:pid' , updateByPid)

export default router