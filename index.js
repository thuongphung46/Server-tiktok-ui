require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const  cookieParser = require('cookie-parser');

const authRoute= require('./routes/auth.js');

dotenv.config();
const app= express();

const uri = 'mongodb+srv://user1:140205111108@ui.oo3nuq9.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri,()=>{
    console.log("connecting....");
}).catch(err => console.log(err.reason));


app.use(cors());
app.use(cookieParser());
app.use(express.json());

//routes
app.use("/v1/auth", authRoute);


app.listen(8000, ()=>{
    console.log("server is running")
});
