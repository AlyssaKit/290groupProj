const customer = require("../models/customer.js");
const menuItem = require("../models/menuItem.js");
const catering = require("../models/catering.js");
const reservation = require("../models/reservation.js");

//all customers
//populates customer list
exports.customerList = async function (req, res, next) {
    try {
        let customerList = await customer.find().populate("customerCateringOrders").populate("customerFavoriteFoods").populate("customerReservations").exec();
        let favFoods = await menuItem.find().populate("name").exec();
        let cater = await catering.find().populate("cateringDate").exec();
        let reserve = await reservation.find().populate("date").exec();
        res.render("allCustomers.ejs", { customerList: customerList, favFoods: favFoods, cater: cater, reserve: reserve });
    } catch (err) {
        next(err);
    }
       
        
};

//customers by ID
exports.singleCustomer = async function (req, res, next) {
    try {
        let singleCustomer = await customer.findById(req.params.id).sort("date").populate("customerCateringOrders").populate("customerFavoriteFoods").populate("customerReservations").exec();
        res.render("singleCustomer.ejs", singleCustomer);
    } catch (err) {
        next(err);
    }
};

//create a new customer
exports.createCustomer = async function (req, res, next) {
    try {
      let newCustomer = new customer({});
      let favFoods = await menuItem.find().populate("name").exec();
      let cater = await catering.find().populate("cateringDate cateringCustomer").exec();
      let reserve = await reservation.find().populate("date customer").exec();
      res.render("customerForm.ejs", {
        title: "Create Customer",
        newCustomer: newCustomer,
        favFoods: favFoods,
        cater: cater,
        reserve: reserve,

      });
    } catch (err) {
      next(err);
    }
  };

  //edit existing customers
  exports.customerUpdate_get = async function (req, res, next) {
      try {
        let newCustomer = await customer.findById(req.params.id).exec();
        let favFoods = await menuItem.find().populate("name").exec();
        let cater = await catering.find().populate("cateringDate").exec();
        let reserve = await reservation.find().populate("date").exec();
          res.render("customerForm.ejs",{ 
            title: `Update ${newCustomer.customerFirstName}`,
            newCustomer: newCustomer,
            favFoods: favFoods,
            cater: cater,
            reserve: reserve,
        });
      } catch (err) {
        next (err);
      }
  };

  //delete customer records
  exports.customerDelete = async function (req, res, next) {
    try {
      await customer.findByIdAndDelete(req.params.id).exec();
      res.redirect("/customer");
    } catch (err) {
      next(err);
    }
  };

  //handles submission for the customer form
  exports.customerUpdate_post = [
    async function (req, res, next) {
      try {
        //If they exists in DB, fetch it
        let newCustomer = await customer.findById(req.params.id).exec();
        let favFoods = await menuItem.find().populate("name").exec();
        let cater = await catering.find().populate("cateringDate").exec();
        let reserve = await reservation.find().populate("date").exec();
        //If not, make one
        if (newCustomer === null)
        newCustomer = new customer({
            _id: req.body.id,
          });
  
        console.log(req.body);
  
  
        //Replace existing data
        newCustomer.customerFirstName = req.body.customerFirstName;
        newCustomer.customerLastName = req.body.customerLastName;
        newCustomer.customerAddress = req.body.customerAddress;
        newCustomer.customerCity = req.body.customerCity;
        newCustomer.customerState = req.body.customerState;
        newCustomer.customerZipcode = req.body.customerZipcode;
        newCustomer.customerTelephone = req.body.customerTelephone;
        newCustomer.customerFavoriteFoods = req.body.customerFavoriteFoods !== "" ? req.body.customerFavoriteFoods : undefined;
        newCustomer.customerCateringOrders = req.body.customerCateringOrders !== "" ? req.body.customerCateringOrders : undefined;
        newCustomer.customerReservations = req.body.customerReservations !== "" ? req.body.customerReservations : undefined;

        newCustomer
        .save()
        .then((newCustomer) => {
          //Success, redirect to details view of customer
          res.redirect(newCustomer.url);
        })
        .catch((err) => {
          //Problem, show the form with error messages
          console.log(err.message);
          res.render("customerForm.ejs", {
            title: "Update Customer",
            newCustomer: newCustomer,
            favFoods: favFoods,
            cater: cater,
            reserve: reserve,
          });
        });
  
      } catch (err) {
        next(err);
      }
    },
  ];






















