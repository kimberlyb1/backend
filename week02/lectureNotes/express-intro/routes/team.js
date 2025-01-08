const express = require("express");
const router = express.Router();
const uuidv4 = require("uuid").v4;

let teamArray = [
    {
        id:uuidv4(),
        name: "lakers"
    },
    {
        id:uuidv4(),
        name: "knicks"
    },
    {
        id:uuidv4(),
        name: "nets"
    }
]

router.get("/", (req, res) =>{
    let foundTeam;
    if(req.query.name){
        teamArray.forEach((team) =>{
            if (req.query.name === team.name){
                foundTeam = team;
            }
        })
        res.json({foundTeam: (foundTeam) ? foundTeam : "could not find team"})
    }else{
        res.json(teamArray)
    }
})

router.post("/create-team/:name", (req, res) =>{

})

router.put("/update-team/:name", (req, res) =>{
    let foundTeam;
    teamArray.forEach((team) =>{
        if(req.params.name === team.name){
            foundTeam = team;
        }
    })
    if(foundTeam && teamArray.filter(e => e.name === req.body.name).length > 0){
        res.json({message : "team name already exists"});
    }else if(foundTeam){
        foundTeam.name = req.body.name;
        res.json({foundTeam});
    }else{
        res.json({message: "cannot find team"});
    }
})

router.delete("/delete-by-id/:id", (req, res) =>{
    const indexDeleted = teamArray.findIndex((team) => team.id === req.params.id)
    
    if(indexDeleted > -1){
        teamArray.splice(indexDeleted, 1)
        res.json({message: "team deleted"})
    }else{
        res.json({message: "cannot find id"})
    }
})

module.exports = router;