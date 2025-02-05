const express = require('express'); 
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
console.log('CORS enabled');

app.use(express.json()); // Parses incoming JSON requests
console.log('JSON body parser enabled');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Database connection error:', err));

// Define Mongoose schema and model
const TodoSchema = new mongoose.Schema({
    todo: String,
    created: { type: Date, default: Date.now }
});
const Todo = mongoose.model('Todo', TodoSchema);

// Routes

// Test Route
app.get('/test', (req, res) => {
    console.log("GET /test hit");
    res.send('Hello, World! Welcome to my server.');
});

// Get all todos
app.get('/gettodos', async (req, res) => {
    console.log("GET /gettodos hit");
    try {
        const todos = await Todo.find();
        console.log('Todos fetched:', todos);
        res.status(200).json(todos);
    } catch (err) {
        console.log('Error fetching todos:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create a new todo
app.post('/create', async (req, res) => {
    console.log("POST /create hit with data:", req.body);
    try {
        const newTodo = new Todo({
            todo: req.body.todo
        });
        const savedTodo = await newTodo.save();
        console.log('New todo created:', savedTodo);
        res.status(201).json(savedTodo);
    } catch (err) {
        console.log('Error creating todo:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a todo
app.delete('/delete/:id', async (req, res) => {
    console.log(`DELETE /delete/${req.params.id} hit`);
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        console.log('Todo deleted:', deletedTodo);
        res.status(200).json(deletedTodo);
    } catch (err) {
        console.log('Error deleting todo:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update a todo
app.put('/edit/:id', async (req, res) => {
    console.log(`PUT /edit/${req.params.id} hit with data:`, req.body);
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { todo: req.body.todo }, { new: true });
        console.log('Todo updated:', updatedTodo);
        res.status(200).json(updatedTodo);
    } catch (err) {
        console.log('Error updating todo:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
