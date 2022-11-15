var express = require("express");
var router = express.Router();
 
const Review = require("../models/reviews");
const Menu = require("../models/menu");

 
router.get("/", async function (req, res, next) {
  console.log("Cookies: ", req.cookies);
  let reviewList = await Review.find().sort("date").populate({ path: 'menuAvalible', select: 'title' }).exec();
  let menus = await Menu.find().populate("title").exec();
  res.render("allReviews.ejs", {reviewList: reviewList, menus:menus});
  next();
});
 
router.get("/:id", async function (req, res, next) {
  try {
    if (!req.cookies || !req.cookies["firstName"]) res.cookie("firstName", "blank");
    if (!req.cookies || !req.cookies["lastName"]) res.cookie("lastName", "blank");
    if (!req.cookies || !req.cookies["password"]) res.cookie("password", "blank");
    let review = await Review.findById(req.params.id).populate("menuAvalible").exec();
    if(!review) {
      throw new Error('No document found');
    }
    res.render("singleReview.ejs", {cookielastName: req.cookies["lastName"] ? req.cookies["lastName"] : "blank",
    cookiefirstName: req.cookies["firstName"] ? req.cookies["firstName"] : "blank",
    cookiePassword: req.cookies["password"] ? req.cookies["password"] : "blank", review:review});
} catch (error) {
    console.log("No document found");
    next();
}
});
 
router.get("/create", async function (req, res, next){
  try {
    console.log("Cookies: ", req.cookies);
     if (!req.cookies || !req.cookies["firstName"]) res.cookie("firstName", "blank");
     if (!req.cookies || !req.cookies["lastName"]) res.cookie("lastName", "blank");
     if (!req.cookies || !req.cookies["password"]) res.cookie("password", "blank");
    let review= new Review({});
    let menus = await Menu.find().populate("title").exec();
    res.render("reviewForm.ejs", {title: "Create Review", review:review, menus:menus, cookielastName: req.cookies["lastName"] ? req.cookies["lastName"] : "blank",
    cookiefirstName: req.cookies["firstName"] ? req.cookies["firstName"] : "blank",
    cookiePassword: req.cookies["password"] ? req.cookies["password"] : "blank"});
  } catch (err) {
    next(err);
  }
});
 
 
router.get("/delete/:id", async function (req, res, next) {
  try {
    await Review.findByIdAndDelete(req.params.id).exec();
    res.redirect("/review/");
  } catch (err) {
    next(err);
  }
});
 
 
router.get("/update/:id", async function (req, res, next) {
  try {
    let review= await Review.findById(req.params.id).populate("menuAvalible").exec();
    let menus = await Menu.find().populate("title").exec();
    res.render("reviewForm.ejs", { title: "Update Review", review:review, menus:menus});
  } catch (err) {
    var err = new Error("Review not found");
    err.status = 404;
    return next(err);
  }
});
 
router.post("/update/:id", async function (req, res, next) {
  let review= await Review.findById(req.params.id).populate("menuAvalible").exec();
  let menus = await Menu.find().populate("title").exec();
 
  if (review === null){
    review= new Review({ _id: req.body.id });
  }
 
  console.log(req.body);
 
  review.firstName = req.body.firstName;
  review.lastName = req.body.lastName;
  review.password = req.body.password;
  review.rating = req.body.rating;
  review.menuAvalible = req.body.menuAvalible !== "" ? req.body.menuAvalible : undefined;
  review.image_url = req.body.image_url;
  review.comment = req.body.comment;
 
  review
      .save()
      .then((review) => {
      res.redirect(review.url);
      })
      .catch((err) => {
      console.log(err.message);
      if (!req.cookies || !req.cookies["firstName"]) res.cookie("firstName", "blank");
      if (!req.cookies || !req.cookies["lastName"]) res.cookie("lastName", "blank");
      if (!req.cookies || !req.cookies["password"]) res.cookie("password", "blank");
      res.render("reviewForm.ejs", {
          title: "Update review",
          review: review,
          menus:menus,
          errors: routeHelper.errorParser(err.message), 
          cookielastName: req.cookies["lastName"] ? req.cookies["lastName"] : "blank",
          cookiefirstName: req.cookies["firstName"] ? req.cookies["firstName"] : "blank",
          cookiePassword: req.cookies["password"] ? req.cookies["password"] : "blank"
      });
      });
});
 
module.exports = router;
