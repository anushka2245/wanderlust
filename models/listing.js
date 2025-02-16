
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listingSchema = new Schema({
    title:{
        type: String
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    image:{
        type:String
    },
    location:{
        type:String
    },
    country:{
        type:String
    }
});