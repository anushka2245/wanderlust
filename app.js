import express from "express";
const app = express();
import mongoose from "mongoose";
app.listen(8080,(req,res)=>{
    console.log("server is running on port 8080");
});