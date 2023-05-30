import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { comparePassword, hashPassword } from '../helpers/auth.js'
import User from '../models/usermodel.js'

dotenv.config()

export const register = async(req,res) => {
    try {
        const {name, username , email , password} = req.body
        /* Name Validation */
        if(!name.trim()){
            return res.json({error : 'Name is Required'})
        }

        /* Username Validations */
        if(!username.trim()){
            return res.json({error: "Username is required"})
        }

        const userNameExsists = await User.findOne({username})
        if(userNameExsists ){
            return res.json({error : 'Username already taken'})
        }

        /* Password Validations */
        if(!password.trim()){
            return res.json({error:"Password is required"})
        }

        if(password.length < 6){
            return res.json({error : "Minimum Length of password 6 Chars"})
        }

        /* Password Hashing using Salt */
        const hashedPassword = await hashPassword(password)

        /* Email Validations  */
        if(!email){
            return res.json({error : "Email Id is required"})
        }
        
        const emailAlreadyExsists = await User.findOne({email})
        if(emailAlreadyExsists ){
            return res.json({error : 'EmailId already Used'})
        }

        /* Data Generated from Registtration from */
        const userData = {
            name,
            username,
            email,
            password : hashedPassword,
            post:[],
            image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg"
        }
        console.log(userData)

        /* Creating a new instace for User with above userData and saving it into DataBase */
        const newUser = await new User(userData).save()
        const token = jwt.sign({_id : newUser._id} , process.env.jwt_secret , {expiresIn : '7d'})

        /* Sending Response */
        res.json({
            newUser,
            jwt_token : token,
        })

    } catch (err) {
        console.log(err)
    }
}

export const login = async(req,res) => {
    try {
        const {username , password} = req.body
        
        // Username Validation
        if(!username.trim()){
            return res.json({error : "Proivde Username to login"})
        }

        const user = await User.findOne({username})
        console.log(user.password)
        if(!user){
            return res.json({error : "User doesnt exists"})
        }

        // Password Validations
        if(!password.trim()){
            res.json({error:'Password required for login'})
        }

        const match = await comparePassword(password , user.password)
        if(!match){
            return res.json({error : "Password didn't match"})
        }

        // Generating JWT Token
        const token = jwt.sign({_id : user._id} , process.env.jwt_secret , {expiresIn:'7d'})

        res.json({
            userData : {
                username : user.username,
            },
            jwt_token : token,
            ok : true,
        })

    } catch (error) {
        res.json({
            ok: false
        })
    }
}