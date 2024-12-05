import express from 'express'
import { authenticate } from '../Middleware/auth.js'
import { createTodo, getTodos, deleteTodo, updateTodo} from '../controller/tod.con.js'
const router = express.Router()
// Define routes
router.post('/create', authenticate, createTodo)
router.get('/fetch', authenticate, getTodos)
router.delete('/delete/:id', authenticate, deleteTodo)
router.put('/update/:id', authenticate, updateTodo)

export default router