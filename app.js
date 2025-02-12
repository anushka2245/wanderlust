const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.listen("8080",(req,res)=>{
    console.log("server is running on port 8080");
})