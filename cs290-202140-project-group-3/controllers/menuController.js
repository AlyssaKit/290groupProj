//For errors
const routeHelper = require("../routes/routeHelpers.js");

const Menu = require("../models/menu.js");
const MenuItem = require("../models/menuItem.js");

//All menus
exports.listAllMenus = async function (req, res, next) {
  let menuList = await Menu.find().exec();
  res.render("allMenus.ejs", { menuList });
  next();
};

//Single menu
exports.singleMenu = async function (req, res, next) {
  try {
    let menu = await Menu.findById(req.params.id).exec();
    let items = await menu.menu_items;
    if (!menu) {
      throw new Error("No document found");
    }
    res.render("singleMenu.ejs", {
      menu: menu,
      items: items,
    });
  } catch (error) {
    console.log("No document found");
    next();
  }
};

//Add a new menu
exports.create = async function (req, res, next) {
  try {
    let menu = new Menu({});
    let allItems = await MenuItem.find().exec(); 
    
    if(allItems !== null){
      allItems.forEach((item, index, arr) => {
        if (item.current_menus.includes(menu._id))
          arr[index].selected = true;
      });
      }

    res.render("menuForm.ejs", {
      menu: menu,
      items: allItems,
    });
  } catch (err) {
    next(err);
  }
};

//Update a menu
exports.update_get = async function (req, res, next) {
  try {
    let menu = await Menu.findById(req.params.id).exec();
    let allItems = await MenuItem.find().exec(); 
    
    if(allItems !== undefined){
    allItems.forEach((item, index, arr) => {
      if (item.current_menus.includes(menu._id))
        arr[index].selected = true;
    });
    }
    res.render("menuForm.ejs", {
      menu: menu,
      items: allItems
    });
  } catch (err) {
    next();
  }
};

exports.delete = async function (req, res, next) {
  try {
    let thisMenu = await Menu.findById(req.params.id).exec();
    thisMenu.remove();
    console.log("Menu deleted");
    res.redirect("/menus");
  } catch (err) {
    next(err);
  }
};

exports.update_post = [
  async function (req, res, next) {
    try {
      let menu = await Menu.findById(req.params.id).exec();
      let allItems = await MenuItem.find().exec(); 
    
      if (menu === null)
        menu = new Menu({
          _id: req.body.id,
        });

        if(allItems !== null){
          allItems.forEach((item, index, arr) => {
            if (item.current_menus.includes(menu._id))
              arr[index].selected = true;
          });
        }

      menu.title = req.body.title;
      menu.description = req.body.description;
      menu.featured = req.body.featured === "true" ? true : false;

      let oldItems = await menu.menu_items;
      let newItemIds = req.body.items;

      let removed = await MenuItem.find()
        .where("_id")
        .in(oldItems)
        .where("_id")
        .nin(newItemIds) 
        .exec();

      removed.forEach(async (menuItem) => {
        menuItem.current_menus = undefined;
        await menuItem.save();
      });

      let added = await MenuItem.find()
        .where("_id")
        .nin(oldItems) 
        .where("_id")
        .in(newItemIds) 
        .exec();

      added.forEach(async (menuItem) => {
        menuItem.current_menus = menu;
        await menuItem.save();
      });

      menu
        .save()
        .then((menu) => {
          res.redirect("/menus/" + menu._id);
        })
        .catch((err) => {
          console.log(err.message);
          res.render("menuForm.ejs", {
            menu: menu,
            items: allItems,
           errors: routeHelper.errorParser(err.message),
          });
        });
    } catch (err) {
      next(err);
    }
  },
];
