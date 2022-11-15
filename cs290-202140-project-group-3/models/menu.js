const mongoose = require("mongoose");
const { db } = require("./menuItem");
const Schema = mongoose.Schema;

let MenuSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    maxlength: [30, "Title limited to 30 characters"],
    index: {
      unique: true,
      collation: { locale: 'en', strength: 2 }
    }
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
    maxlength: [100, "Description limited to 100 characters"],
  },
  featured: {
    type: Boolean,
    required: [true, "Please select featured yes/no"],
  },
});

MenuSchema.virtual("url").get(function () {
  return "/menus/" + this._id;
});

MenuSchema.virtual("menu_items").get(async function () {
  const MenuItem = require("./menuItem");

  let allMenuItems = await MenuItem.find().populate("current_menus").exec();
  let relMenus = [];
  for(let menuItem of allMenuItems){
    for(let curMen of menuItem.current_menus){
      if(curMen._id.equals(this._id)){
        relMenus.push(menuItem);
      }
    }
  }
  return relMenus;
});

MenuSchema.remove(function (err, product) {
  if (err) return handleError(err);
  MenuItem.findById(MenuSchema._id, function (err, product) {
    console.log(product); // null
  })
})

//Export model
module.exports = mongoose.model("Menu", MenuSchema);
