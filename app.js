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



app.get("/" , (req,res)=>{
    res.render("./listing/login.ejs");
});

app.get("/sign" , (req,res)=>{
    res.render("./listing/sign");
});

app.post("/sign" , async (req,res,next)=>{
    try{
        let {email,pass,name} = req.body;
        let q = await Sign.findOne({email: email});
        
        if (q && q.email === email) {
            res.redirect("/sign");
        } else {
            let p = new Sign({
                email : email,
                name : name,
                password : pass
            });
            
            p.save().then((res)=>{
                console.log(res);
            }).catch((err)=>{
                console.log(err);
            });
    
            res.redirect("/list");
            
            
        }
    }catch (err){
        next(err);
    }
})



app.post("/login", async (req, res, next) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let q = await Sign.findOne({email: email});
        
        if (q && q.password === password) {
            res.redirect("/list");
        } else {
            
            res.render("./listing/login.ejs")
        }
    } catch(err) {
        next(err);
    }
});



app.get("/privacy",(req,res) =>{
    res.render("./listing/privacy.ejs")
})

app.get("/terms",(req,res) =>{
    res.render("./listing/terms.ejs")
})

app.get("/search", async (req, res,next) => {
    try {
        const { search } = req.query;
    
        if (!search) {
            return res.render("./listing/notfound.ejs");
        }

        const lists = await List.find({
            $or: [
                { location: { $regex: search, $options: "i" } },
                { country: { $regex: search, $options: "i" } }
            ]
        });

        
        if (!lists || lists.length === 0) {
            return res.render("./listing/notfound.ejs");
        }

        res.render("./listing/index.ejs", { lists });

    } catch (err) {
        next( err);
       
    }
});




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


