const express = require('express');
const router = express.Router();
const User = require("../models/login");
const passport = require('passport');
const {check,saveRedirectUrl } = require("../utils/middleware");
const { logIn , signIn , logOut } = require('../controllers/login');



router.get('/favicon.ico', (req, res) => res.status(204).end());

router.get("/signup",(req,res)=>{
    res.render("./listing/sign.ejs")
});

router.post("/sign", signIn);

router.get("/log",(req,res,next)=>{
    res.render("./listing/login.ejs")
})

router.post(
    "/login",saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/user/log", // Redirect to '/log' if authentication fails
        failureFlash: true, // Enable flash messages on failure
        // successRedirect: "/", // Redirect to '/' on successful login
        failureMessage: true, // Provide a failure message
    }),
    logIn
);

router.get("/logout", logOut);




module.exports = router;
