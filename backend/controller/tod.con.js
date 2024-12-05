import { Todo } from "../Models/Todo.js";


export const  createTodo  = async (req,res)=>{
    const {text}=req.body
    if(!req.body.text) return res.status(400).json({error: 'Please provide a text for the todo'})

    const todo = new Todo({
        text,
        completed: req.body.completed || false,
        user: req.user._id,
    });
    
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


// export const  updateTodo  = async (req,res)=>{
//     const {text, completed} = req.body
//     const todo = await Todo.findByIdAndUpdate(req.params.id, {text, completed}, {new: true})
//     if(!todo) return res.status(404).json({error: 'Todo not found'})
//     res.json(todo)

// }

export const updateTodo = async (req, res) => {
    try {
      const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(201).json({ message: "Todo Updated Successfully", todo });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Error occuring in todo updating" });
    }
  };


export const deleteTodo = async (req, res) => {
    try {
      const todo = await Todo.findByIdAndDelete(req.params.id);
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.status(200).json({ message: "Todo Deleted Successfully" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Error occuring in todo Deletion" });
    }
  };