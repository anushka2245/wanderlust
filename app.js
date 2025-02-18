const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const path = require("path");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
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

//index route
app.get("/listings",async (req,res)=>{
   const allListings = await listing.find({});
   res.render("./listings/index.ejs",{allListings});
});

//show route
app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    const Listing = await listing.findById(id);
    res.render("./listings/show.ejs",{Listing});
});


//new route
app.get("/listing/new",(req,res)=>{
    
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