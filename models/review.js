const mongoose = require("mongoose");

const revSch = new mongoose.Schema({
    comment : String,
    rating :{
        type : Number,
        min : 1,
        max : 5
    },
    created :{
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model("Review", revSch);