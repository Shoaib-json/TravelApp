const express = require("express");
const app = express();
const mongoose = require("mongoose");
const List = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ErrorH = require("./utils/error");
const Sign = require("./models/login");
const {ListSchema} = require("./utils/schema");
const Review = require("./models/review");
const {revSch} = require("./utils/schema");

const list = require("./routes/list")


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

app.use("/", list);


// const rush = (req,res,next)=>{
//     let { error } = revSch.validate(req.body);
//     if(error) {
//         throw new ErrorH(400, error);
//     } else {
//         next();
//     }
// }








app.all("*",(req,res)=>{
    let  message = " Page not found"
    res.render("./listing/notfound.ejs" , {message})
})


app.use((err,req,res,next)=>{
    let{status=500 , message = "not found"} = err;
    res.render("./listing/notfound.ejs" , {message});
})




app.listen(8080 , (req,res)=>{
    console.log("post is listening");
})


