import express from 'express'
import { login, logout, SignUp } from '../controller/user.con.js'
const router = express.Router()


// Define routes
router.post('/signup',SignUp)
router.post('/login',login)
router.get('/logout', logout)

export default router

