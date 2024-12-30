const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
    title :{
        type : String,
        required : true
    },
    description:{
        type : String
    },
    image: {
        filename: { type: String, required: true },
        url: { type: String, required: true }},
    price : {
        type : Number,
        required : true
    },
    location :{
        type : String,
        required : true
    },
    country:{
        type : String,
        required : true
    }
});

const List = mongoose.model("List",ListSchema);
module.exports = List;