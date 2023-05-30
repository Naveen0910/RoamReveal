import mongoose from 'mongoose'
import Post from '../models/postmodel.js'
import User from '../models/usermodel.js'

export const create = async(req,res) => {
    try {
        const {title , description , image , creator} = req.body
        const newPost = new Post ({
            title,
            description,
            image,
            creator
        })
        // Check for user 
        let user

        try {
            user = await User.findById(creator);
        } catch (error) {
            return res.json({error:"Upload Failed Try again"})
        }

        if(!user){
            res.json({error:"Cant find user"})
        }

        const sess = await mongoose.startSession();
        sess.startTransaction();
        await newPost.save({session:sess})
        user.post.push(newPost)
        await user.save({session:sess})
        await sess.commitTransaction();

        res.json(newPost)
        
    } catch (error) {
        console.log(error)
        res.json({error : "Post cannot be created"})
    }
}

export const readPostByPid = async(req,res) => {
    try {
        const postId = req.params.pid
        console.log(postId)
        const foundPost = await Post.findById(postId)
        res.json({foundPost : foundPost.toObject({getters:true}) })
    } catch (error) {
        console.log(error)
    }
}

export const readPostByUid = async(req,res) => {
    try {
        const userId = req.params.uid
        const foundPosts = await Post.find({creator : userId})
        if(!foundPosts || foundPosts.length === 0){
            res.status(404).json({error : "Could not find posts by users"})
        }
        res.json({foundPosts : foundPosts.map(post => post.toObject({getters:true}))})

    } catch (error) {
        console.log(error)
    }
}

export const updateByPid = async(req,res) =>{
    try {
        const postId = req.params.pid
        const {title , description , image , creator} = req.body
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {
                title,
                description,
                image,
                creator,
            },
            {
                new:true
            }
        )
        if(!updatedPost){
            res.status(404).json({error : "Post not found"})
        }
        res.json({updatedPost : updatedPost.toObject({getters:true})})
    } catch (error) {
        console.log(error)
    }
}