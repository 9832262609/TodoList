

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:7000";

function Home() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchtodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/fetch`, {
          withCredentials: true,
        //   headers: { "Content-Type": "application/json" },
        });
        console.log(response.data)
        if (response?.data) {
            console.log(response.data)
          setTodos(response.data);
        } else {
          setError("Invalid response format.");
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
        setError("Unable to fetch todos. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchtodos();
  }, []);

  const todoCreate = async () => {
    const trimmedTodo = newTodo.trim();
    if (!trimmedTodo) {
      return toast.error("Todo cannot be empty!");
    }
    try {
      const response = await axios.post(
        `${BASE_URL}/create`,
        { text: trimmedTodo, completed: false },
        { withCredentials: true }
      );
      if (response?.data?.newTodo) {
        setTodos((prevTodos) => [...prevTodos, response.data.newTodo]);
        setNewTodo("");
        toast.success("Todo added successfully!");
      } else {
        throw new Error("Invalid response format.");
      }
    } catch (error) {
      console.error("Error creating todo:", error);
      setError("Failed to create todo. Please try again.");
    }
  };

  const todoStatus = async (id) => {
    const todo = todos.find((t) => t._id === id);
    if (!todo) return;

    try {
      const response = await axios.put(
        `${BASE_URL}/update/${id}`,
        { completed: !todo.completed },
        { withCredentials: true }
      );
      if (response?.data?.todo) {
        setTodos((prevTodos) =>
          prevTodos.map((t) => (t._id === id ? response.data.todo : t))
        );
        toast.success("Todo status updated!");
      } else {
        throw new Error("Invalid response format.");
      }
    } catch (error) {
      console.error("Error updating todo status:", error);
      setError("Failed to update todo status.");
    }
  };

  const todoDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) {
      return;
    }
    try {
      const response = await axios.delete(`http://localhost:7000/delete/${id}`, {
        withCredentials: true,
      });
      if (response?.status === 200) {
        setTodos((prevTodos) => prevTodos.filter((t) => t._id !== id));
        toast.success("Todo deleted!");
      } else {
        throw new Error("Invalid response format.");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      setError("Failed to delete todo.");
    }
  };

  const logout = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/logout`, {
        withCredentials: true,
      });
      if (response?.status === 200) {
        localStorage.removeItem("jwt");
        toast.success("Logged out successfully!");
        navigateTo("/login");
      } else {
        throw new Error("Logout failed.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const remainingTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="my-10 bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center">Todo App</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              todoCreate();
            }
          }}
          className="flex-grow p-2 border rounded-l-md focus:outline-none"
        />
        <button
          onClick={todoCreate}
          className="bg-blue-600 border rounded-r-md text-white px-4 py-2 hover:bg-blue-900 duration-300"
        >
          Add
        </button>
      </div>
      {loading ? (
        <div className="text-center justify-center">
          <span className="text-gray-500">Loading...</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 font-semibold">{error}</div>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex items-center justify-between p-3 bg-gray-100 rounded-md"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => todoStatus(todo._id)}
                  className="mr-2"
                />
                <span
                  className={`${
                    todo.completed
                      ? "line-through text-gray-800 font-semibold"
                      : ""
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => todoDelete(todo._id)}
                className="text-red-500 hover:text-red-800 duration-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4 text-center text-sm text-gray-700">
        {remainingTodos} remaining todos
      </p>
      <button
        onClick={logout}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 duration-500 mx-auto block"
      >
        Logout
      </button>
    </div>
  );
}

export default Home;
