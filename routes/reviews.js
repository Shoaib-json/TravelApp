const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ErrorH = require("../utils/error");
const path = require("path");
const methodOverride = require("method-override");
const List = require("../models/listing");
const Review = require("../models/review");
const {check,saveRedirectUrl , isReviewOwner} = require("../utils/middleware");
const {addReview,deleteReview } = require("../controllers/review")

router.get('/favicon.ico', (req, res,next) => res.status(204).end().next());

router.post("/:id/review" , check , addReview );


router.delete("/:id/review/:reviewId",check,isReviewOwner,deleteReview );





module.exports = router;