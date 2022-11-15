const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//defines what it means to be a customer
//customer needs a first name (a-z, A-Z only)
let CustomerSchema = new Schema({
  customerFirstName: { 
    type: String,
    required: [true, "You must enter a first name"],
    },

    //customer needs a last name (a-z, A-Z only)
  customerLastName: { 
    type: String,
    required: [true, "You must enter a last name"],
    },

    //customer needs a street address
  customerAddress: { 
    type: String,
    required: [true, "You must enter a street address"],
    },

    //customer needs a city (a-z, A-Z only)
  customerCity: { 
    type: String,
    required: [true, "You must enter a city name"],
    },

    //customer needs a state (a-z, A-Z only)
  customerState: { 
    type: String,
    required: [true, "You must enter a state"],
    },

    //customer needs a zipcode
  customerZipcode: { 
    type: Number,
    required: [true, "You must enter a zipcode"],
    min: [00001, "Minimum range is 00001"],
    max: [99950, "Maximum range is 99950"],
    },

    //customer needs a telephone
  customerTelephone: { 
    type: Number,
    required: [true, "You must enter a telephone"],
    min: [1111111111, "Minimum range is 1111111111"],
    max: [9999999999, "Maximum range is 9999999999"],
    },

    //customer can have favorite foods
  customerFavoriteFoods: [{type: Schema.Types.ObjectId, ref:"MenuItem",
  required: [true, "Please select the menu item(s)"]}],

    //customer can have catering orders
  customerCateringOrders: [{type: Schema.Types.ObjectId, ref:"Catering",
  required: [true, "Please select the catering date(s)"]}],

    //customer can have reservations
  customerReservations: [{type: Schema.Types.ObjectId, ref:"Reservation",
  required: [true, "Please select the reservation date(s)"]}],
  });


CustomerSchema.virtual("url").get(function () {
  return "/customer/" + this._id;
});

CustomerSchema.virtual("first_last_address_phone").get(function () {
  return this.customerFirstName + " " + this.customerLastName + " " + this.customerAddress + " " + this.customerCity + " " + this.customerState + " " + this.customerZipcode + " " + this.customerTelephone;
});

CustomerSchema.virtual("first_last_reservation_telephone").get(function () {
  return this.customerFirstName + " " + this.customerLastName + " " + this.customerReservations + " " + this.customerTelephone;
});

CustomerSchema.virtual("first_last_catering_telephone").get(function () {
  return this.customerFirstName + " " + this.customerLastName + " " + this.customerCateringOrders + " " + this.customerTelephone;
});


//Export model
module.exports = mongoose.model("Customer", CustomerSchema);