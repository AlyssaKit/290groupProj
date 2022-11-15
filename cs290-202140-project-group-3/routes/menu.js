var express = require("express");
var router = express.Router();

const menuController = require("../controllers/menuController");
const Menu = require("../models/menu.js");
const MenuItem = require("../models/menuItem.js");

router.get("/", menuController.listAllMenus);

router.get("/:id", menuController.singleMenu);

router.get("/create", menuController.create);

router.get("/delete/:id", menuController.delete);

router.get("/update/:id", menuController.update_get);

router.post("/update/:id", menuController.update_post);

module.exports = router;
