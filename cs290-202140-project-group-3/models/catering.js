const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CateringSchema = new Schema({
  cateringCustomer: [{type: Schema.Types.ObjectId, ref: "Customer",
    required: [true, "Please include a customer for this catering order."]}],
  cateringAddress: {type: String, 
    required: [true, "Please provide an address."]},
  cateringDate: {type: Date, 
    required: [true, "Please provide a date for this catering order."]},
  cateringMenu: [{type: Schema.Types.ObjectId, ref: "Menu", 
    required: [true, "Please select a menu."]}],
  cateringPartySize: {type: Number,
    required: [true, "Please provide your party size."],
    min: [10, "Minimum party amount is 10"],
    max: [100, "Maximum party amount is 100"],}
  
});

CateringSchema.virtual("url").get(function () {
  return "/catering/" + this._id;
});


//Export model
module.exports = mongoose.model("Catering", CateringSchema);