const express = require('express')
const router = express.Router()
const uuidv4 = require("uuid").v4

const shop = [
    {
        name: "toothbrush", 
        price: 2,
        id: uuidv4()   
    },
    {
        name: "shirt",
        price:10,
        id:uuidv4()
    },
    {
        name: "apple",
        price: .5,
        id: uuidv4()
    }
]

router.get('/', (req, res)=>{
    res.json({
        message: "This is the shop"
    })
})

router.get('/search', (req, res) =>{
    const {item, id} = req.query

    const foundItem = shop.filter(element => {
        if(element.name === item || element.id === id){
            return element
        }
    })
    if(foundItem){
        res.json(foundItem)
    }else{
        res.end("Could not find item")
    }
})

module.exports = router;