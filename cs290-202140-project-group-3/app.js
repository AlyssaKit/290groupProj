var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Use database with mongoose
const credentials = require("./dbCredentials.js");
const mongoose = require("mongoose");
mongoose.connect(credentials.connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Add in custom routes
app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

var menuRouter = require("./routes/menu");
app.use("/menus", menuRouter);

var menuItemRouter = require("./routes/menuItem");
app.use("/menuItems", menuItemRouter);

var cateringRouter = require("./routes/catering");
app.use("/catering", cateringRouter);

var customerRouter = require("./routes/customer");
app.use("/customer", customerRouter);

var reservationRouter = require("./routes/reservation");
app.use("/reservation", reservationRouter);
var reviewRouter = require("./routes/review");
app.use("/review", reviewRouter);

app.use(express.static(path.join(__dirname, "public")));

app.use(function(req, res, next) {
  res.sendFile(__dirname + "/public/404.html");
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
