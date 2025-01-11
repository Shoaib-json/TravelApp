const Review = require("../models/review");

module.exports.check = (req, res, next) => {
    console.log(req.user); 

    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("Error", "You need to log in first"); 
        return res.redirect("/user/log"); 
    }

    next(); 
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl; 
    }
    next(); 
};


module.exports.isOwner = async (req,res,next)=>{
    let{id} = req.params;
    let list = await List.findById(id)
    if(!list.user._id.equals(res.locals.currUser._id)){
        req.flash("Error" , "You Do Not have Access");
        res.redirect(`/${id}`);
    }
    next();
}

module.exports.valList = (req, res, next) => {
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
};



module.exports.isReviewOwner = async (req, res, next) => {
    try {
        let { id, reviewId } = req.params;  // Match the exact parameter names from the route
        
        let review = await Review.findById(reviewId);
        
        if (!review) {
            req.flash("Error", "Review not found");
            return res.redirect(`/${id}`);
        }

        if (!review.user._id.equals(res.locals.currUser._id)) {
            req.flash("Error", "You do not have access");
            return res.redirect(`/${id}`);
        }

        next();
    } catch (err) {
        req.flash("Error", "Something went wrong");
        return res.redirect(`/${id}`);
    }
};