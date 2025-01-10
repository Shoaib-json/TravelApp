const express = require('express');
const router = express.Router();
const User = require("../models/login");
const passport = require('passport');
const {check,saveRedirectUrl } = require("../utils/middleware")






router.get('/favicon.ico', (req, res) => res.status(204).end());

router.get("/signup",(req,res)=>{
    res.render("./listing/sign.ejs")
});

router.post("/sign",async  (req,res,next)=>{
    try{
    let { email,username,password} = req.body;
    let user1 = new User({
        email : email,
        username : username
    });
    let Q =await User.register(user1,password);
    req.login(Q,(err)=>{
        if(err){
            next(err)
        }else{
            req.flash("success", "welcome to TripTale");
            console.log(Q);
            res.redirect("/")}

    })
    
    }catch(err) {
        next(err)
    }
});

router.get("/log",(req,res,next)=>{
    res.render("./listing/login.ejs")
})

router.post(
    "/login",saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/log", // Redirect to '/log' if authentication fails
        failureFlash: true, // Enable flash messages on failure
        // successRedirect: "/", // Redirect to '/' on successful login
        failureMessage: true, // Provide a failure message
    }),
    async (req, res) => {
        
        req.flash("Error", "You are logged in"); // Flash a custom error message
        let redirect = res.locals.redirectUrl || "/";
        res.redirect(redirect ); // Redirect after setting the flash message
    }
);

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("Error", "You are loggedOut");
        res.redirect("/");
    });
});

router.all("/*",(req,res)=>{
    let  message = " Page not found"
    res.render("./listing/notfound.ejs" , {message})
});


module.exports = router;
