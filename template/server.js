// Import Express
// npm i express
const express = require('express');

// Initialize the app
const app = express();

// Define a port
const PORT = 3000;

// Define a simple route
app.get('/', (req, res) => {  //req, res cycle
    res.send('Hello, world!');  //response
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
