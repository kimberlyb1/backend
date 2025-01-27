// const express = require("express")
// const cors = require('cors')
// const app = express()
// const mongoose = require("mongoose")

// app.use(cors())
// app.use(express.json())

// require('dotenv').config()

// const PORT = 3000

// const Schema = mongoose.Schema

// const ToDoSchema = new Schema(
//     {
//         todo: String,
//         created: Date
//     }
// )
// const ToDo = mongoose.model('ToDo', ToDoSchema)

// app.get("/test", (req, res) => {
//     console.log("Test route hit")
//     res.json({ msg: "success" })
// })

// app.get("/getTodos", (req, res) => {
//     console.log("getTodos HIT")
//     ToDo.find()
//         .then(found => {
//             console.log("Found", found)
//             res.json(found)
//         })
// })

// app.post("/create", (req, res) => {
//     console.log("Create Route HIT", req.body)
//     ToDo.create(req.body)
//         .then(created => {
//             console.log("created", created)
//             res.json(created)
//         })



// })

// app.listen(PORT, () => {

//     mongoose.connect(process.env.MONGO_URI)
//         .then(() => {
//             console.log("Connected to Database")
//         })
//     console.log(`Server is runnning on port ${PORT}`)
// })

const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());
require("dotenv").config();
const port = process.env.PORT || 3005;
const ToDoSchema = new mongoose.Schema({
  todo: String,
  created: { type: Date, default: Date.now },
  
});
const ToDo = mongoose.model("todos", ToDoSchema);
// const Schema = mongoose.Schema;
app.get("/test", (req, res) => {
  console.log("Test route hit");
  res.json({ msg: "success" });
});
// app.get("/getTodos", (req, res) => {
//   console.log("getTodos HIT");
//   ToDo.find().then((found) => {
//     console.log("Found", found);
//     res.json(found);
//   });
// });
app.get("/getTodos", async (req, res) => {
  console.log("getTodos HIT");
  ToDo.find()
    .then((response) => {
      res.json(response);
      console.log("response", response);
    })
    .catch((err) => res.json(err));
});
// app.post('/create', (req, res) => {
//     console.log(req.body)
//     const {  todo, created} = req.body;
//     const newTodo = new ToDo({
//         todo,
//         created: created ? new Date(created) : undefined
//     })
//    newTodo.save()
//    .then(savedTodo => {
//     console.log("New ToDo saved: ", savedTodo);
//     res.status(201).json(savedTodo);
//    }).catch((err) => {
//     console.log("Error saving ToDo: ", err);
//     res.status(400).json({ error: err.message });
//    })
// })
app.post("/create", (req, res) => {
  const todo = req.body.todo;
  ToDo.create({ todo: todo })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});
// app.delete("/delete/:id", (req, res) => {
//   const { id } = req.params;
//   ToDo.findByIdAndDelete(id)
//   .then((response) => {
//     !response
//       ? res.status(404).json({ msg: "no to founf" })
//       : res
//           .status(200)
//           .json({ msg: "Todo deleted successfully" })
//           .catch((err) => {
//             res.status(500).json({ msg: err });
//           });
//   });
// });
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const {todo} = req.body;
  console.log("id:", id);
  console.log(req.body);
  ToDo.findByIdAndUpdate(id,{todo},  {new:true})
    .then((updatedTodo) => {
      if(updatedTodo){
        const response = { ...updatedTodo.toObject(), new: false };
      res.status(200).json(updatedTodo);
      } else {
        res.status(404).json({msg: "Todo not found"});
      }
    })
    .catch((err) => {
      res.json(err);
    });
});
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  ToDo.findByIdAndDelete({ _id: id })
    .then((response) => response.json(response))
    .catch((err) => {
      res.json(err);
    });
});
// app.post("/create", (req, res) => {
//   console.log("Create Route HIT", req.body);
//   ToDo.create(req.body).then((created) => {
//     console.log("created", created);
//     res.json(created);
//   });
// });
app.listen(port, () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log(process.env.MONGO_URI);
  });
  console.log(`Server is runnning on port ${port}`);
});