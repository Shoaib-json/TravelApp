const Review = require("../models/review");
const List = require("../models/listing");


module.exports.addReview = async (req,res,next)=>{
    try{
    let {rating,comment} = req.body;
    const q =  new Review({
        comment : comment,
        rating : rating,
        user : req.user._id
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
};

module.exports.deleteReview =async(req,res)=>{
    try{let {id , reviewId}= req.params;
    await List.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    let a = await Review.findByIdAndDelete(reviewId);
    console.log(a)
    req.flash("success" , "Review deleted");
    res.redirect(`/${id}`);
    }catch (err){
        next(err)
    }
}