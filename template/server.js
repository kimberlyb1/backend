// // Import Express
// // npm i express
// const express = require('express');

// // Initialize the app
// const app = express();

// app.use(express.json()); // Middleware to parse JSON body

// // Define a port
// const PORT = 3000

// app.get("/pokemon", (req, res) => {
//     console.log("pokemon hit")
//     res.json({msg: "pokemon hit"})
// })
// app.get("/", (req, res) => {
//     console.log("/ endpoint  hit")
// })

// // Start the server
// app.listen(PORT, () => {   
//      console.log(`Server is running on http://localhost:${PORT}`);
//      });

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to your Express.js server!');
});

app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ message: `User ID is ${userId}` });
});

app.post('/data', (req, res) => {
  const body = req.body;
  res.json({ message: 'Data received', data: body });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});




