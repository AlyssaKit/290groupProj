const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ReservationSchema = new Schema({
  date: {type: Date,
    required: [true, "Please provide a date and time for reservation"]},
  customer: [{type: Schema.Types.ObjectId, ref:"Customer",
    required: [true, "Please select the customer this reservation is for"]}],
  peopleAmount: {type: Number, 
    required: [true, "Please provide the amount of people attending"],
    min: [1, "Minimum amount is 1"],
    max: [20, "Maximum amount is 20"],},
  specialOccassion: {type: String,
    required: [true, "Please enter NA if there is no special occasion"]},
  menuAvalible: [{type: Schema.Types.ObjectId, ref:"Menu",
    required: [true, "Please select the menu options for this reservation"]}]
});

ReservationSchema.virtual("url").get(function () {
  return "/reservation/" + this._id;
});


//Export model
module.exports = mongoose.model("Reservation", ReservationSchema);