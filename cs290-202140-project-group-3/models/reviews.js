const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
let ReviewSchema = new Schema({
  firstName:{type: String,
    required: [true, "Please enter your First Name"]},
  lastName:{type: String,
    required: [true, "Please enter your Last Name"]},
  rating: {type: Number,
    required: [true, "Please provide your rating"],
    min: [1, "Minimum amount is 1"],
    max: [5, "Maximum amount is 5"],},
  image_url: { type: String},
  comment: {type: String,
    required: [true, "Please enter your review"]},
  menuAvalible: [{type: Schema.Types.ObjectId, ref:"Menu"}],
  password:{type: String, required:[true, "Please provide a password"]}
});
 

ReviewSchema.virtual("url").get(function () {
  return "/review/" + this._id;
});
 
 
//Export model
module.exports = mongoose.model("Review", ReviewSchema);