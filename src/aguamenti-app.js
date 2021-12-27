const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


const port = Number(process.env.PORT || 3000);
const uri = String(process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', async(req, res)=> {
    console.log(req.query)
    res.send("gg")
})

app.listen(port, ()=>{
    console.log(`Server running at: http://localhost:${port}`)
})