const express = require('express')
const logger = require('morgan')
const path = require('path') //helps build PATH to documents
const shopRouter = require('./routes/shopRouter')
const app = express()

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(logger("dev"))

app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))
app.use('/shop', shopRouter)


app.get('/', (req, response) =>{
    // response.send("Hello World")
    response.render("index", {name: "Kyle", friends: ["Chris", "Carlos", "Camille"]})
})


app.post("/create-item/", (req, res)=>{
    const {item, price} = req.body
    console.log(req.body)

    let newItem = {
        name: item,
        price: price
    }
    res.json(newItem)
})

app.listen(3000, () => {
    console.log("Server Started on port 3000")
})