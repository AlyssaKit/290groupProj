var express = require("express");
var router = express.Router();
const multer = require('multer'); 

const menuItemController = require("../controllers/menuItemController");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });

router.get("/", menuItemController.listAllMenuItems);

router.get("/:id", menuItemController.singleMenuItem);

router.get("/create", menuItemController.create);

router.get("/delete/:id", menuItemController.delete);

router.get("/update/:id", menuItemController.update_get);

router.post("/update/:id", upload.single('image'), menuItemController.update_post); 

module.exports = router;