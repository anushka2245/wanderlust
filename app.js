const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const path = require("path");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>{
    console.log("connection to DB");
}).catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);

}

app.get("/",(req,res)=>{
    res.send("Hello, i am root");
});

app.get("/listings",async (req,res)=>{
   const alllistings = await listing.find({});
   res.render("index.ejs",{alllistings});
});




// app.get("/testlisting",async (req,res)=>{
//     let sampleListing = new listing(
//         {
//         title:"my new villa",
//         description:"its a beautiful villa",
//         price:1000,
//         location:"bangalore",
//         image:"https://d3oo9u3p09egds.cloudfront.net/filters:format(webp)/rental_property/colina-villa-h/01_Facade__10_.jpeg",
//         country:"India"
//     }
// );
//     await sampleListing.save();
//     console.log("listing saved");
//     res.send("listing saved successful");
// });
app.listen(8080,()=>{
    console.log("server is running on port 8080");
})