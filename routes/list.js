
const express = require('express');
const router = express.Router();
const List = require("../models/listing");
const ErrorH = require("../utils/error");    
const {ListSchema} = require("../utils/schema");
const Review = require("../models/review");
const {revSch} = require("../utils/schema");
const User = require("../models/login");
const passport = require('passport');
const {check, isOwner , valList} = require("../utils/middleware");
const{newForm,search,createList,index , showRoute , editPage , updateRoute , destroyRoute} = require("../controllers/list.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js"); 
const upload = multer({ storage });


router.get('/favicon.ico', (req, res) => res.status(204).end());


// creating new user
router.get("/new/create",check, newForm)


router.get("/privacy",(req,res) =>{
    res.render("./listing/privacy.ejs")
})

router.get("/terms",(req,res) =>{
    res.render("./listing/terms.ejs")
})

router.get("/search",search);

router.post("/new1/submit" , upload.single('image'), createList);

router.get("/", index);

router.post("/:id/book", check, async (req, res) => {
    const { bookedOn } = req.body;
    const listingId = req.params.id;
  
    let q = await List.findByIdAndUpdate(listingId, {
      bookedBy: req.user._id,
      bookedOn: bookedOn
    });
  
    console.log(q);
    res.redirect("/");
  });
  

router.get("/:id",showRoute);




router.get("/:id/edit", check, editPage);




router.put("/:id/update" ,upload.single('image'), updateRoute );


// deleting the route 
router.delete("/:id/delete",check,destroyRoute );






module.exports = router;