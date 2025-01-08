const express = require('express');
const router = express.Router();
const User = require("../models/login");
const passport = require('passport');


router.get("/signup",(req,res,next)=>{
    res.render("./listing/sign.ejs")
})
router.post("/sign",async  (req,res,next)=>{
    try{
    let { email,username,password} = req.body;
    let user1 = new User({
        email : email,
        username : username
    });
    let Q =await User.register(user1,password);
    res.send(Q);
    console.log(Q);
    }catch(err) {
        next(err)
    }

});

router.get("/log",(req,res,next)=>{
    res.render("./listing/login.ejs")
})

router.post("/login", 
    passport.authenticate('local', {
        failureRedirect: '/log',
        failureFlash: true,
        successRedirect: '/',
        failureMessage: true,
    })
);


module.exports = router;
