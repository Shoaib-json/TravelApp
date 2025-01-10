const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ErrorH = require("./utils/error");
const User = require("./models/login.js")
const flash = require('connect-flash');
const session = require("express-session");
const passport = require("passport");
const localPass = require("passport-local").Strategy;




const pist = require("./routes/list.js");
const review = require("./routes/reviews.js");
const user = require("./routes/login.js")
 



app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,'public')));


main().then(()=>{
    console.log("db is connected");
})
.catch(err => console.log(err));


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}

app.use((req,res,next)=>{
    req.date = new Date();
    console.log(req.date,req.method , req.path);
    next();
});

const sessionOpp = {
    secret : "truck",
    resave : false,
    saveUninitialized: true,
    cookie :{
        expires : Date.now() +7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,
        httpOnly : true
    }
};

app.use(session(sessionOpp));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localPass(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.Error = req.flash("Error");
    res.locals.currUser = req.user;
    next();
})


app.use("/user" , user);
app.use("/re", review );
app.use("/", pist);




app.all("*",(req,res)=>{
    let  message = " Page not found"
    res.render("./listing/notfound.ejs" , {message})
})


app.use((err ,req, res, next)=>{
    let{status=404, message = "not found"} = err;
    res.render("./listing/notfound.ejs" , {message});
})


app.listen(8080 , (req,res)=>{
    console.log("post is listening");
})


