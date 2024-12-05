import express from 'express'
import dontenv from 'dotenv'
import cors  from 'cors'
import { mongodb } from './config/db.js'
import userRoute  from './router/user.route.js'
import todoRoute from './router/todo.route.js'
import cookieParser from 'cookie-parser'
dontenv.config()
// Import route

const app = express()

// Middleware

app.use(cookieParser())
app.use(express.json())
mongodb()
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Include cookies, if needed
  }));
app.use('/',userRoute)
app.use('/',todoRoute)

// OR Enable CORS for a specific origin




const port = process.env.PORT || 7000

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})


