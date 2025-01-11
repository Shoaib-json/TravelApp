
const express = require('express');
const router = express.Router();
const List = require("../models/listing");
const ErrorH = require("../utils/error");    
const {ListSchema} = require("../utils/schema");
const Review = require("../models/review");
const {revSch} = require("../utils/schema");
const User = require("../models/login");
const passport = require('passport');
const {check, isOwner , valList} = require("../utils/middleware")




router.get('/favicon.ico', (req, res) => res.status(204).end());


// creating new user
router.get("/new/create",check,(req,res)=>{
    
    res.render("./listing/new.ejs");

})


router.get("/privacy",(req,res) =>{
    res.render("./listing/privacy.ejs")
})

router.get("/terms",(req,res) =>{
    res.render("./listing/terms.ejs")
})

router.get("/search", async (req, res,next) => {
    try {
        const { search } = req.query;
    
        if (!search) {
            return res.render("../listing/notfound.ejs");
        }
        const lists = await List.find({
            $or: [
                { location: { $regex: search, $options: "i" } },
                { country: { $regex: search, $options: "i" } }
            ]
        });
        if (!lists || lists.length === 0) {
            return res.render("../listing/notfound.ejs");
        }
        res.render("./listing/index.ejs", { lists });

    } catch (err) {
        next( err);  
    }
});

router.post("/new1/submit",valList , async (req, res,next) => {
    
    try {
        const { title, price, location, country, description, image} = req.body;
        const lists = new List({
            title,
            description,
            price : parseInt(req.body.price, 10) ,
            image: { filename: "image", url: image },
            location,
            country,
            user : req.user._id
        }); 
        await lists.save();
       
        req.flash("success" , " Place published");
        res.redirect(`/${lists._id}`); 
        console.log("Data saved:", lists);
    } catch (err) {
        next(err);
    }
});

router.get("/",async (req,res) =>{
    const lists = await List.find();
    res.render("./listing/index.ejs",{lists});
});

router.get("/:id", async (req,res)=>{
    let {id} = req.params;
    const lists = await List.findById(id)
    .populate({
        path : "reviews",
        populate:
        {path : "user"},})
    .populate("user");
    console.log(lists)
    res.render("./listing/show.ejs" , {lists});
});




router.get("/:id/edit", check, async(req,res,next)=>{
    try{let {id}=req.params;
    const q = await List.findById(id);
    res.render("./listing/edit.ejs",{q})
}catch(err){
    next(err)
}

});


router.put("/:id/update" , valList ,async (req,res,next)=>{
    try{
    let{id} = req.params;
     
    let {title,description,price,location,country,image} = req.body;
    let pass = req.body.pass;

    if(pass == "admin"){
    let q = await List.findByIdAndUpdate(id,{
        title: title,
        price : price,
        image : {
            filename : 'image456',
            url : image
        },
        description : description,
        location : location,
        country : country
    },{runValidators:true,new:true});
    
    console.log(q);
    
    req.flash("success" , "place updated");
    res.redirect("/")}
    else{
        res.render("./listing/notfound.ejs")
    }
    }catch(err){
        next(err)
    }

});


// deleting the route 
router.delete("/:id/delete",check, async (req,res,next)=>{

    try{
    let {id} = req.params;
    let q = await List.findByIdAndDelete(id);
    req.flash("Error" , "Deleted");
    res.redirect("/");
    
    }catch {
        next(err);
    }
});

//review
router.post("/:id/review" ,check, async (req,res,next)=>{
    try{
    
    let {rating,comment} = req.body;
    
    const q =  new Review({
        comment : comment,
        rating : rating
    });
    await q.save();
    let lists = await List.findById(req.params.id);
    if(!lists){
        return res.status(404).send("List not found");
    }
    lists.reviews.push(q);
    await lists.save();
    console.log(lists);
    console.log(q);
    req.flash("success" , "Created");
    res.redirect(`/${req.params.id}`);
    // res.render("./listing/show.ejs",{lists})

    }catch{ ((err) => {
        next(err);
    });}
})

router.delete("/:id/review/:reviewId",check,async(req,res)=>{
    try{let {id , reviewId}= req.params;
    await List.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    let a = await Review.findByIdAndDelete(reviewId);
    console.log(a)
    req.flash("success" , "deleted");
    res.redirect(`/${id}`);
    }catch (err){
        next(err)
    }
});

router.all("/*",(req,res)=>{
    let  message = " Page not found"
    res.render("./listing/notfound.ejs" , {message})
})


module.exports = router;