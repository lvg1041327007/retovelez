const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const app = express();

const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://leidy:062421@cluster0.8nymoep.mongodb.net/?retryWrites=true&w=majority")
    .then (() => console.log('Connected to binnaclesDb in MongoDB Atlas'))
    .catch ((error) => console.error('Cannot connect to Db,  ' + error))

const binnacleSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    dateIn: {
        type: Date,
        required: true
    },
   
    observations: {
        type: String,
        required: true
    },
}, {versionKey: false});

const binnacle = mongoose.model("binnacle", binnacleSchema);

app.get('/index', (req, res) =>{
    res.sendFile(__dirname + "/index.html");
});

app.post('/addbinnacle', (req, res) => {
    const myData = new binnacle(req.body);
    myData.save()
        .then(item => {
            res.status(201).send(myData);
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.get('/getbinnacle', (req, res) => {
    const date = new Date(req.query.looking)
    console.log ({req: date}) 
    binnacle.find({date})
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(404).json('Error: ' + err));
})

app.listen(port, () => {
 console.log("corriendo puerto 3000");
});