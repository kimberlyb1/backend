import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/gettodos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const response = await axios.post("http://localhost:3000/create", { todo: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/delete/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const updateTodo = async (id) => {
    const updatedText = prompt("Enter updated todo:");
    if (!updatedText.trim()) return;
    try {
      const response = await axios.put(`http://localhost:3000/update/${id}`, { todo: updatedText });
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter a new todo"
      />
      <button onClick={addTodo}>Add Todo</button>
      <div>
        {todos.map((todo) => (
          <div key={todo._id} style={{ margin: "10px", padding: "10px", border: "1px solid black" }}>
            <p>{todo.todo}</p>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            <button onClick={() => updateTodo(todo._id)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
