
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listingSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    image:{
        type:String,
        default:"https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=612x612&w=0&k=20&c=9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc=",
        set:(v)=>v===""?"https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=612x612&w=0&k=20&c=9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc=":v,

    },
    location:{
        type:String
    },
    country:{
        type:String
    }
});
const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;