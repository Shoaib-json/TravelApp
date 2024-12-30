const mongoose = require('mongoose');

const SignUpSchema = new mongoose.Schema({
    email:{
        type: String,
        maxLength:50,
        required : true,
        unique : true,
        trim : true
       
    },  
    name :{
        type : String,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
});

const Sign = new mongoose.model('Sign',SignUpSchema);

module.exports = Sign;