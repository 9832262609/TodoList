import { Todo } from "../Models/Todo.js";


export const  createTodo  = async (req,res)=>{
    const todo = new Todo({
        title: req.body.title,
        completed: req.body.completed,
        user: req.user._id, // assuming user is authenticated and has a user ID in their request context
    })
    try{
        const newTodo = await todo.save()
        res.status(201).json({message:'todo created successfully',newTodo})
    }
    catch(error){
        res.status(400).json({error: error.message})
        console.log(error.message)
    }
}


export const  getTodos  = async (req,res)=>{
    try{
        const todos = await Todo.find({user: req.user._id}).sort({createdAt: -1})
        res.json(todos)
    }
    catch(error){
        res.status(400).json({error: error.message})
        console.log(error.message)
    }
}