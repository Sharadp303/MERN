const User=require("../Models/usermodel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require('dotenv').config()

async function signUp(req,res){
    try{
        const {name,username,email,password}=req.body
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.json({message:"User already exist"})
        }
        const newuser= await User.create({name,username,email,password})
        res.status(201).json({message:"Signed Up successfully"})
    }
    catch(err){
        console.log(err)
    }
}

async function signIn(req,res){
    try{
        const {email,password}=req.body;
    
        if(!email || !password){
            return res.json({message:"All field are required"})
        }
        const user= await User.findOne({email});
        if(!user){
            return res.json({message:"Invalid Email or password"})
        }
        const validpass= await bcrypt.compare(password,user.password)
        if(!validpass){
            return res.json({message:"Invalid Email or password"})
        }
    
        const token= await jwt.sign({id:user._id},process.env.secretkey,{expiresIn:"1h"})
        res.cookie("token",token,{
            expires:new Date(Date.now() + (10 * 60 * 1000)),
            withCredentials:true,
            httpOnly:false,
        })
        res.status(201).json({message:"Signed In successfully"})
    }
    catch(err){
        console.log(err)
    }


}

async function signOut(req,res){
    
    res.clearCookie('token');
    res.json({message:"Signed Out sucessfully"})

}

module.exports={signUp,signIn,signOut}