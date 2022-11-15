//For errors
const routeHelper = require("../routes/routeHelpers.js");
var fs = require("fs");
var path = require("path");

const MenuItem = require("../models/menuItem.js");
const Menu = require("../models/menu.js");

//All menus
exports.listAllMenuItems = async function (req, res, next) {
  let menuItemList = await MenuItem.find().exec();
  res.render("allMenuItems.ejs", { menuItemList });
  next();
};

//Single menu
exports.singleMenuItem = async function (req, res, next) { 
  try {
    let menuItem = await MenuItem.findById(req.params.id)
      .populate("current_menus")
      .exec();
    if (!menuItem) {
      throw new Error("No document found");
    }
    res.render("singleMenuItem.ejs", menuItem);
  } catch (error) {
    console.log("No item document found");
    next();
  }
};

//Add a new menuItem
exports.create = async function (req, res, next) {
  try {
    let menuItem = new MenuItem({});
    let menus = await Menu.find().select("title").exec();
    res.render("menuItemForm.ejs", {
      menuItem: menuItem,
      menus: menus,
    });
  } catch (err) {
    next();
  }
};

//Update a menuItem
exports.update_get = async function (req, res, next) {
  try {
    let menuItem = await MenuItem.findById(req.params.id).exec();
    let menus = await Menu.find().select("title").exec();
    res.render("menuItemForm.ejs", {
      menuItem: menuItem,
      menus: menus,
    });
  } catch (err) {
    next();
  }
};

exports.update_post = [
  async function (req, res, next) {
    try {
      let menuItem = await MenuItem.findById(req.params.id).exec();
      let menus = await Menu.find().select("title").exec();
      if (menuItem === null)
        menuItem = new MenuItem({
          _id: req.body.id,
        });

      menuItem.name = req.body.name;
      menuItem.menu_section = req.body.menu_section;
      menuItem.price = req.body.price;
      menuItem.image_url = req.body.image_url;

      menuItem.featured = req.body.featured === "true" ? true : false;
      menuItem.image_use_file = req.body.use_file === "true" ? true : false;

      let ingredientList = req.body.ingredients.split("\n");
      for (let i = 0; i < ingredientList.length; i++) {
        ingredientList[i] = ingredientList[i].trim();
        if (ingredientList[i] === "") {
          ingredientList.splice(i, 1);
          i--;
        }
      }
      menuItem.ingredients = ingredientList;
      menuItem.current_menus = req.body.menus !== "" ? req.body.menus : undefined;

      if( menuItem.img.data !== undefined && req.file){
        fs.unlink(path.join(__dirname + "/../uploads/" + menuItem.imgPath), (err) => {
          if (err) {
              console.log("failed to delete local image:"+err);
              next(err);
          } else {
              console.log('successfully deleted local image');                
          }
        });
      }
      if(req.file){
      menuItem.img.data = fs.readFileSync(path.join(__dirname + "/../uploads/" + req.file.filename));
      menuItem.img.contentType = 'image/png';
      menuItem.imgPath = req.file.filename;
      }

      menuItem
        .save()
        .then((menuItem) => {
          res.redirect("/menuItems/" + menuItem._id);
        })
        .catch((err) => {
          console.log(err.message);
          res.render("menuItemForm.ejs", {
            menuItem: menuItem,
            menus: menus,
            errors: routeHelper.errorParser(err.message),
          });
        });
    } catch (err) {
      next(err);
    }
  },
];

exports.delete = async function (req, res, next) {
  
  try {
    let menuItem = await MenuItem.findById(req.params.id).exec();
    if(menuItem.img.data !== undefined){
     fs.unlink(path.join(__dirname + "/../uploads/" + menuItem.imgPath), (err) => {
        if (err) {
            console.log("failed to delete local image:"+err);
            next(err);
        } else {
            console.log('successfully deleted local image');  
            MenuItem.findByIdAndDelete(req.params.id).exec();
            res.redirect("/menuItems/");                  
        }
      });
    } else {
        MenuItem.findByIdAndDelete(req.params.id).exec();
        res.redirect("/menuItems/");                  
    }
    
    
  } catch (err) {
    next(err);
  }
};