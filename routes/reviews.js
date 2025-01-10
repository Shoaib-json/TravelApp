const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ErrorH = require("../utils/error");
const path = require("path");
const methodOverride = require("method-override");
const List = require("../models/listing");
const Review = require("../models/review");


router.get('/favicon.ico', (req, res,next) => res.status(204).end().next());

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
    req.flash("success" , "Review Created");
    res.redirect(`/${req.params.id}`);
    // res.render("./listing/show.ejs",{lists})

    }catch (err) {
        next(err)
    }
});


router.delete("/:id/review/:reviewId",async(req,res)=>{
    try{let {id , reviewId}= req.params;
    await List.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    let a = await Review.findByIdAndDelete(reviewId);
    console.log(a)
    req.flash("success" , "Review deleted");
    res.redirect(`/${id}`);
    }catch (err){
        next(err)
    }
});


router.all("/*",(req,res)=>{
    let  message = " Page not found"
    res.render("./listing/notfound.ejs" , {message})
});


module.exports = router;