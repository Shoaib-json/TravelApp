const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        maxLength:50,
        required : true
    }
});
userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model('User',userSchema);


module.exports = User;