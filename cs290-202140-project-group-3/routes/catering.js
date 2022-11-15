var express = require("express");
var router = express.Router();

const Catering = require("../models/catering");
const Customer = require("../models/customer");
const Menu = require("../models/menu");

router.get("/", async function (req, res, next) {
  let cateringList = await Catering.find().populate({ path: 'cateringCustomer', select: 'customerFirstName customerLastName'}).populate({ path: 'cateringMenu', select: 'title' }).exec();
  let customer = await Customer.find().select("cateringCustomer").populate("customerFirstName").populate("customerLastName").exec();
  let menu = await Menu.find().populate("title").exec();
  res.render("allCaterings.ejs", { cateringList: cateringList, customer: customer, menu: menu });
  next();
});

router.get("/:id", async function (req, res, next) {
  try {
    let catering = await Catering.findById(req.params.id).populate("cateringCustomer cateringMenu").exec();
    if(!catering) {
      throw new Error('No document found');
    }
    res.render("singleCaterings.ejs", {catering : catering});
} catch (error) {
    console.log("No document found");
    next();
}
});

router.get("/create", async function (req, res, next){
  try {
    let catering = new Catering({});
    let customer = await Customer.find().select("customer").populate("customerFirstName").populate("customerLastName").exec();
    let menus = await Menu.find().populate("title").exec();
    res.render("cateringForm.ejs", {title: "New Catering", catering:catering, customer:customer, menus:menus});
  } catch (err) {
    next(err);
  }
});

router.get("/update/:id", async function (req, res, next) {
  try {
    let catering = await Catering.findById(req.params.id).populate("cateringCustomer cateringMenu").exec();
    let menus = await Menu.find().populate("title").exec();
    let customer = await Customer.find().select("customer").populate("customerFirstName").populate("customerLastName").exec();

    res.render("cateringForm.ejs", { title: "Update Catering", catering:catering, customer:customer, menus:menus});
  } catch (err) {
    var err = new Error("catering order not found");
    err.status = 404;
    return next(err);
  }
});

router.post("/update/:id", async function (req, res, next) {
    let catering = await Catering.findById(req.params.id).populate("cateringCustomer cateringMenu").exec();
    let menus = await Menu.find().populate("title").exec();
    let customer = await Customer.find().select("customer").populate("customerFirstName").populate("customerLastName").exec();
  if (catering === null){
    catering = new Catering({ _id: req.body.id });
  }

  console.log(req.body);

  catering.cateringCustomer = req.body.cateringCustomer !== "" ? req.body.cateringCustomer : undefined;
  catering.cateringDate = req.body.cateringDate;
  catering.cateringAddress = req.body.cateringAddress;
  catering.cateringMenu = req.body.cateringMenu !== "" ? req.body.cateringMenu : undefined;
  catering.cateringPartySize = req.body.cateringPartySize;

  console.log(catering);

  catering
      .save()
      .then((catering) => {
      res.redirect(catering.url);
      })
      .catch((err) => {
      console.log(err.message);
      res.render("cateringForm.ejs", {
          title: "Update Catering",
          catering: catering,
          customer:customer,
          menus:menus,
          //errors: routeHelper.errorParser(err.message),
      });
      });
});

router.get("/delete/:id", async function (req, res, next) {
  try {
    await Catering.findByIdAndDelete(req.params.id).exec();
    res.redirect("/catering/");
  } catch (err) {
    next(err);
  }
});

module.exports = router;