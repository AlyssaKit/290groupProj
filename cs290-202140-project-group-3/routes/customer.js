var express = require("express");
var router = express.Router();

const customerController = require("../controllers/customerController.js");


//for some reason i had to put the create route on top of the other routes or else a casting error happens
router.get("/create", customerController.createCustomer);

router.get("/", customerController.customerList);

router.get("/:id", customerController.singleCustomer);



router.get("/delete/:id", customerController.customerDelete);

router.get("/update/:id", customerController.customerUpdate_get);

router.post("/update/:id", customerController.customerUpdate_post);

module.exports = router;