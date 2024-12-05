import jwt from 'jsonwebtoken'
import {User } from '../Models/User.js';
import cookieParser from 'cookie-parser';
import express from 'express';

const app = express();
app.use(cookieParser());

export const  generateTokenAndSaveInCookies = async (userId,res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "lax",
        path: "/",
      });
      
     await User.findByIdAndUpdate(userId,{token})
     return token;
}