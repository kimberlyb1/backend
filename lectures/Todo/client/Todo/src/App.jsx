<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"
=======
import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
>>>>>>> e99a36b2b76e0a546fe949089abd8771d75c696c

function App() {
<<<<<<< HEAD
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
=======
  // const [count, setCount] = useState(0)

  const [data, setData] = useState()
  const [flag, setFlag] = useState(false)
  const [edit, setEdit] = useState({
    todo: ""
  })
  const [render, setRender] = useState(false)
>>>>>>> 70aa466026c52edda5d73c7d3028ca7dccfe51ed

  // test
  // test
  // test
  const [newToDo, setNewToDo] = useState(
    {
      todo: "",
      created: Date.now()
    }
  )


  useEffect(() => {
    console.log("useEFFECT TRIGGERED")
  }, [data])


  useEffect(() => {
<<<<<<< HEAD
    fetchTodos();
  }, []);

<<<<<<< HEAD
  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/gettodos");
      setTodos(response.data);
      console.log("res", response);
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
      console.log("res", response);
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
<>
<div className="whole container">

    <div className="container">
      <h1 className="container-h">Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter a new todo"
        />
      <button className="btn" onClick={addTodo}>Add Todo</button>
      <div className="todo-container">
        {todos.map((todo) => (
          <div key={todo._id} style={{ margin: "10px", padding: "10px", border: "1px solid black" }}>
            <p className="todo-box">{todo.todo}</p>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            <button onClick={() => updateTodo(todo._id)}>Edit</button>
          </div>
        ))}
      </div>
        </div>
    </div>
        </>
  );
=======
=======
    console.warn("USEEFFECT HIT AGAIN")
>>>>>>> 70aa466026c52edda5d73c7d3028ca7dccfe51ed
    axios({
      method: "get",
      url: "http://localhost:3000/gettodos"
    })
      .then(res => {
        console.log("res", res)
        // console.log("sorted", sorted)
        setData(res.data)

      })
      .catch(err => console.log("err", err))

  }, [flag])

  const handleNewToDo = (e) => {

    console.log("handleNewToDo Hit", e)
    console.log("handleNewToDo Hit", e.target)
    console.log("handleNewToDo Hit", e.target.value)

    setNewToDo((prev) => ({
      ...prev,
      todo: e.target.value
    }))


  }
  const handleSubmit = (e) => {

    console.log("HandleSubmit HIT", newToDo)

    console.log("i am getting stuff")
    axios({
      method: "post",
      url: "http://localhost:3000/create",
      data: newToDo

    })
      .then(res => {
        console.log("res", res)
        // setNewToDo({todo: ""})
        setFlag(!flag)
      })
      .catch(err => console.log(err))

  }

  const handleDelete = (e) => {

    console.log("DEL Hit e.target.e", e.target.id)

    axios({
      method: "delete",
      url: `http://localhost:3000/delete/${e.target.id}`
    })
      .then(res => {
        console.log("re", res)
        console.log("RES", res.data._id)
        setData((prev) => prev.filter((item) => item._id != res.data._id))
      })
      .catch(err => console.log(err))
  }

  const handleEdit = () => {
    setRender(!render)
  }

  const handleEditSubmit = (e) => {
    console.log("HandleEdit HIT", e.target.id)
    axios({
      method: "put",
      url: `http://localhost:3000/edit/${e.target.id}`,
      data: edit
    })
      .then(res => {
        console.log("$$$$$$$$", res)
      })
      .catch(err => console.log(err))
  }

  const handleEditChange = (e) => {
    console.log("handleEditChange  HIT", e.target.value)
    setEdit({ todo: e.target.value })
  }



  return (
    <>
      {/* {console.log("data", data)} */}
      {/* {console.log("flag", flag)} */}
      {/* {console.log("EDIT", edit)} */}
      {console.warn("render", render)}
      {/* {console.log("newToDo", newToDo)} */}
      <input onChange={(e) => handleNewToDo(e)} />

      <button onClick={(e) => handleSubmit(e)}>Submit</button>


      {data && data.sort((a, b) => b.created - a.created).map((item) => {
        return (

          <div key={item._id} style={{ marginBottom: "20px" }}>

            <div style={{ border: '2px solid red' }}>

              {/* {render ? <p>TRUE</p>   :   <p>False</p>      }   */}


              {render
                ?
                (
                  <div>
                    <input
                      defaultValue={item.todo || ""}
                      onChange={(e) => handleEditChange(e)}
                    >
                    </input>

                    <button
                      id={item._id}
                      onClick={(e) => handleEditSubmit(e)}
                    >
                      Submit
                    </button>

                  </div>
                )
                :
                (
                  <p> {item.todo}</p>
                )
              }



              <button id={item._id} onClick={(e) => handleDelete(e)}>delete</button>
              <button id={item._id} onClick={(e) => handleEdit(e)}>edit</button>

            </div>
          </div>
        )
      })}

<<<<<<< HEAD
  </>
)
>>>>>>> e99a36b2b76e0a546fe949089abd8771d75c696c
=======
    </>
  )
>>>>>>> 70aa466026c52edda5d73c7d3028ca7dccfe51ed
}

export default App;
