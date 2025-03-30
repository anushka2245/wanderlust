const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const expressError = require("./utils/ExpressError.js");
const ExpressError = require("./utils/ExpressError.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsmate);
app.use(express.static(path.join(__dirname,"/public")));

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
  .then(() => {
    console.log("Connection to DB established");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
  res.send("Hello, I am root");
});

// Index route
app.get("/listings", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings }); // Removed './'
}));

// New route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs"); // Removed './'
});

// Show route
app.get("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id); // Renamed `Listing` to `listing`
  res.render("listings/show.ejs", { listing }); // Removed './'
}));

// Create route
app.post("/listings", wrapAsync(async (req, res,next) => {
  if(!req.body.listing){
    throw new ExpressError(400,"send valid data for listing");
  }
  let newlisting = new Listing(req.body.listing);
  await newlisting.save();
  res.redirect("/listings");
}));

// Edit route
app.get("/listings/:id/edit", wrapAsync(async(req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing }); 
}));

// Update route
app.put("/listings/:id", wrapAsync(async(req, res) => {
  if(!req.body.listing){
    throw new ExpressError(400,"send valid data for listing");
  }
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
}));

// Delete route
app.delete("/listings/:id", wrapAsync(async(req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  console.log("Deleted");
  res.redirect("/listings");
}));

// Sample listing test route (Uncomment if needed)
// app.get("/testlisting", async (req, res) => {
//   let sampleListing = new Listing({ // Changed 'listing' to 'Listing'
//     title: "My New Villa",
//     description: "It's a beautiful villa",
//     price: 1000,
//     location: "Bangalore",
//     image: "https://d3oo9u3p09egds.cloudfront.net/filters:format(webp)/rental_property/colina-villa-h/01_Facade__10_.jpeg",
//     country: "India",
//   });
//   await sampleListing.save();
//   console.log("Listing saved");
//   res.send("Listing saved successfully");
// });
app.all("*",(req,res,next)=>{
  next(new ExpressError("404","Page not found!"));
});

app.use((err,req,res,next)=>{
  let {status=404,message="something went to wrong!"}=err;
  res.status(status).send(message);
});
app.listen(8081, () => {
  console.log("Server is running on port 8080");
});
