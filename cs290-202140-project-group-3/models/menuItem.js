const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let MenuItemSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [20, "Name limited to 20 characters"],
    index: {
      unique: true,
      collation: { locale: 'en', strength: 2 }
    }
  },
  menu_section: {
    type: String,
    required: [true, "Please provide a menu_section"],
  },
  featured: {
    type: Boolean,
    required: [true, "Please select featured yes/no"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price"],
    min: [0, "Minimum price is 0"],
  },
  image_use_file: {type: Boolean, required: [true, "Please select file or url image type"]},
  image_url: { type: String },
  imgPath: { type: String },
  img:
    {
        data: Buffer,
        contentType: String,
    },
  ingredients: {
    type: [{ type: String }],
    validate: [
      function (value) {
        return value.length <= 10;
      },
      "Menu items limited to 10 ingredients",
    ],
  },
  current_menus: [{ type: Schema.Types.ObjectId, ref: "Menu" }],
});

MenuItemSchema.virtual("url").get(function () {
  return "/menuItems/" + this._id;
});

MenuItemSchema.virtual("format_price").get(function () {
  return "$" + this.price.toFixed(2);
});
//Export model
module.exports = mongoose.model("MenuItem", MenuItemSchema);
