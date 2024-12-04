import express from 'express'
import { authenticate } from '../Middleware/auth.js'
import { createTodo, getTodos } from '../controller/tod.con.js'
const router = express.Router()
// Define routes
router.post('/create', authenticate, createTodo)
router.get('/fetch', authenticate, getTodos)

export default router