
const express = require('express');
const router = express.Router();
const List = require("../models/listing");
const ErrorH = require("../utils/error");
const Sign = require("../models/login");
const {ListSchema} = require("../utils/schema");
const Review = require("../models/review");
const {revSch} = require("../utils/schema");



const valList = (req, res, next) => {
    const listingData = {
        listing: {
            ...req.body,    
            price: parseInt(req.body.price, 10)
        }
    };
    let { error } = ListSchema.validate(listingData);
    console.log(error);

    if(error) {
        throw new ErrorH(400, error);
    } else {
        next();
    }
}
router.get("/log" , (req,res)=>{
    res.render("./listing/login.ejs");
});

router.get("/sign" , (req,res)=>{
    res.render("./listing/sign");
});

router.post("/sign" , async (req,res,next)=>{
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



router.post("/login", async (req, res, next) => {
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
router.post("/new1/submit",valList , async (req, res,next) => {
    console.log("Incoming data:", req.body); 
    try {
        const { title, price, location, country, description, image} = req.body;
        const lists = new List({
            title,
            description,
            price : parseInt(req.body.price, 10) ,
            image: { filename: "image", url: image },
            location,
            country,
        }); 
        await lists.save();
        console.log("Data saved:", lists);
        res.render("./listing/show.ejs",{lists});
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
    const lists = await List.findById(id).populate("reviews");
    res.render("./listing/show.ejs" , {lists});
});

// creating new user
router.get("/new/create",(req,res)=>{

    res.render("./listing/new.ejs");

})


router.get("/:id/edit", async(req,res,next)=>{
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
    let lists = q;
    res.render("./listing/show.ejs",{lists})}
    else{
        res.render("./listing/notfound.ejs")
    }
    }catch(err){
        next(err)
    }

});


// deleting the route 
router.delete("/:id/delete", async (req,res,next)=>{

    try{
    let {id} = req.params;
    let q = await List.findByIdAndDelete(id);
    res.redirect("/");
    }catch {
        next(err);
    }
});

//review
router.post("/:id/review" ,async (req,res,next)=>{
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
    res.redirect(`/${req.params.id}`);
    // res.render("./listing/show.ejs",{lists})

    }catch{ ((err) => {
        next(err);
    });}
})

router.delete("/:id/review/:reviewId",async(req,res)=>{
    try{let {id , reviewId}= req.params;
    await List.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    let a = await Review.findByIdAndDelete(reviewId);
    console.log(a)

    res.redirect(`/${id}`);
    }catch (err){
        next(err)
    }

}
)

module.exports = router;