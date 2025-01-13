const User = require("../models/login");

module.exports.signIn =async  (req,res,next)=>{
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
}

module.exports.logIn = async (req, res, next) => {
        
    req.flash("success", "You are logged in"); // Flash a custom error message
    let redirect = res.locals.redirectUrl || "/";
    res.redirect(redirect ); // Redirect after setting the flash message
    
}

module.exports.logOut = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("Error", "You are loggedOut");
        res.redirect("/");
    });
}