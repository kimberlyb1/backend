const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

const cors = require('cors');

const app = express();
console.log('Express app');

app.use(express.json());  //creates and gives access to the req.body




app.get('/test', (req, res) => {
    console.log("TEST hit")
    res.send('Hello, World! welcome to my server.');
});






const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {


    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to my Database")
        })
        .catch(err => console.log("err", err))


    console.log(`Server is running on http://localhost:${PORT}`)
})

