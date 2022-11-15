var express = require("express");
var router = express.Router();

const Reservation = require("../models/reservation");
const Customer = require("../models/customer");
const Menu = require("../models/menu");

router.get("/", async function (req, res, next) {
  let reservationList = await Reservation.find().sort("date").populate({ path: 'customer', select: 'customerFirstName customerLastName'}).populate({ path: 'menuAvalible', select: 'title' }).exec();
  let menus = await Menu.find().populate("title").exec();
  let customer = await Customer.find().select("customer").populate("customerFirstName").populate("customerLastName").exec();
 for(let r of reservationList){
  if(r.customer == ""){
    await Reservation.findByIdAndDelete(r._id).exec();
  }
} res.render("allReservations.ejs", { reservationList: reservationList, customer:customer, menus:menus });
  next();
});

router.get("/:id", async function (req, res, next) {
  try {
    let reservation = await Reservation.findById(req.params.id).populate("customer menuAvalible").exec();
    if(!reservation) {
      throw new Error('No document found');
    }
    res.render("singleReservation.ejs", {reservation: reservation});
} catch (error) {
    console.log("No document found");
    next();
}
});

router.get("/create", async function (req, res, next){
  try {
    let reservation = new Reservation({});
    let menus = await Menu.find().populate("title").exec();
    let customer = await Customer.find().select("customer").populate("customerFirstName").populate("customerLastName").exec();
    res.render("reservationForm.ejs", {title: "Create Reservation", reservation:reservation, customer:customer, menus:menus});
  } catch (err) {
    next(err);
  }
});


router.get("/delete/:id", async function (req, res, next) {
  try {
    await Reservation.findByIdAndDelete(req.params.id).exec();
    res.redirect("/reservation/");
  } catch (err) {
    next(err);
  }
});


router.get("/update/:id", async function (req, res, next) {
  try {
    let reservation = await Reservation.findById(req.params.id).populate("customer").populate("menuAvalible").exec();
    let menus = await Menu.find().populate("title").exec();
    let customer = await Customer.find().select("customer").populate("customerFirstName").populate("customerLastName").exec();

    res.render("reservationForm.ejs", { title: "Update reservation", reservation:reservation, customer:customer, menus:menus});
  } catch (err) {
    var err = new Error("reservation not found");
    err.status = 404;
    return next(err);
  }
});

router.post("/update/:id", async function (req, res, next) {
  let reservation = await Reservation.findById(req.params.id).populate("customer").populate("menuAvalible").exec();
    let menus = await Menu.find().populate("title").exec();
    let customer = await Customer.find().select("customer").populate("customerFirstName").populate("customerLastName").exec();
  if (reservation === null){
    reservation = new Reservation({ _id: req.body.id });
  }

  console.log(req.body);

  reservation.customer = req.body.customer !== "" ? req.body.customer : undefined;;
  reservation.date = req.body.date;
  reservation.peopleAmount = req.body.peopleAmount;
  reservation.menuAvalible = req.body.menuAvalible !== "" ? req.body.menuAvalible : undefined;
  reservation.specialOccassion = req.body.specialOccassion;

  console.log(reservation);

  reservation
      .save()
      .then((reservation) => {
      res.redirect(reservation.url);
      })
      .catch((err) => {
      console.log(err.message);
      res.render("reservationForm.ejs", {
          title: "Update reservation",
          reservation: reservation,
          customer:customer,
          menus:menus,
          //errors: routeHelper.errorParser(err.message),
      });
      });
});

module.exports = router;