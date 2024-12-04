import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required:true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // referencing User model to connect to users collection in MongoDB.
        required: true,
      },
},)

export const Todo = mongoose.model("Todo", todoSchema);