
const express = require("express");
const logger = require("morgan");
const path = require("path");


const app = express();

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) =>{
    res.render("index")
    //res.send('Hello class');
    // res.json({
    //     name:"hamster",
    //     friends: ["tommy", "geo", "john"],
    //     food: {
    //         food1: "candies",
    //         food2: "burgers"
    //     },
    //     boolean1: true,
    //     boolean2: false,
    //     number:123
    // });

});

app.get("/:product", (req, res) =>{
    console.log(req.params);
    res.json({
        price: 100,
        type: req.params.product
    })
})

app.post('/create-product', (req, res) =>{
    console.log(req.body)
    res.json({
        data: req.body
    })  
})

app.listen(3000, () =>{
    console.log(`Server is running on PORT: ${3000}`)
})