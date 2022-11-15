//--------------------------------------------
//Data that we will load into MongoDB
  const menuList = [
    {
    title: "Lunch",
    description: "Lunch menu selections are available before 5:00 PM",
    featured: false,
    },
    {
      title: "Dinner",
      description: "Dinner menu selections are available after 5:00 PM",
      featured: false,
    },
    {
      title: "Seasonal",
      description: "See what's new this season",
      featured: true,
    },
    {
      title: "Catering",
      description: "Catering for any occasion",
      featured: false,
    },
  ];

  const menuItemList = [
    {
      name: "Raspberry Pie",
      menu_section: "Dessert",
      featured: false,
      price: 4.75,
      image_use_file: false,
      image_url: "/images/raspberrypie.jpg",
      ingredients: ["raspberries", "gluten-free pie crust"], 
      current_menus: [],
    },
    {
      name: "Ham and Swiss on Rye",
      menu_section: "Main Course",
      featured: false,
      price: 11.0,
      image_use_file: false,
      image_url: 'https://schwebels.com/~/media/Images/Recipes/ham-cheese_387x298.ashx',
      ingredients: ["ham", "swiss cheese", "rye bread", "tomato", "butter", "lettuce"], 
      current_menus: [],
    },
    {
      name: "Caprese Salad",
      menu_section: "Appetizer",
      featured: false,
      price: 6.50,
      image_use_file: false,
      image_url: "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2Farchive%2F3b432b41ce04c96a08d77befa42b9881a587a436",
      ingredients: ["mozzarella", "tomato", "basil", "balsamic vinegar", "olive oil"], 
      current_menus: [],
    },
    {
      name: "Chef Salad",
      menu_section: "Main Course",
      featured: false,
      price: 7.50,
      image_use_file: false,
      image_url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-081221-chef-salad-03-landscape-jg-1631045032.jpg",
      ingredients: ["ham", "cheese", "lettuce", "tomato", "egg", "cucumber", "dressing"], 
      current_menus: [],
    },
  ];

  const customerList = [
    {
      customerFirstName: "Hakuna",
      customerLastName: "Matata",
      customerAddress: "1357 Jungle Road",
      customerCity: "Salem",
      customerState: "OR",
      customerZipcode: 11876,
      customerTelephone: 9719011123,
      customerFavoriteFoods: [],
      customerCateringOrders: [],
      customerReservations: [],
    },
    {
      customerFirstName: "Johnny",
      customerLastName: "Brabo",
      customerAddress: "2468 Evenly Street",
      customerCity: "Eugene",
      customerState: "OR",
      customerZipcode: 21372,
      customerTelephone: 9719012468,
      customerFavoriteFoods: [],
      customerCateringOrders: [],
      customerReservations: [],
    },
    {
      customerFirstName: "Bamber",
      customerLastName: "Bird",
      customerAddress: "3303 Guilty Drive",
      customerCity: "Portland",
      customerState: "OR",
      customerZipcode: 31372,
      customerTelephone: 9719019876,
      customerFavoriteFoods: [],
      customerCateringOrders: [],
      customerReservations: [],
    },
    {
      customerFirstName: "Donny",
      customerLastName: "Wepp",
      customerAddress: "666 Freedom Lane",
      customerCity: "Independence",
      customerState: "OR",
      customerZipcode: 97360,
      customerTelephone: 9719015555,
      customerFavoriteFoods: [],
      customerCateringOrders: [],
      customerReservations: [],
    },
  ];

  const reservationList = [
    {
      date: "11-03-2022 12:30 PM",
      customer:[],
      peopleAmount: 4,
      specialOccassion: "Birthday",
      menuAvalible:[]
    },
    {
      date: "07-11-2022 7:00 PM",
      customer:[],
      peopleAmount: 3,
      specialOccassion: "NA",
      menuAvalible:[]
    },
    {
      date: "05-29-2022 7:30 PM",
      customer:[],
      peopleAmount: 2,
      specialOccassion: "Engagment",
      menuAvalible:[]
    },
    {
      date: "08-22-2022 5:30 PM",
      customer:[],
      peopleAmount: 6,
      specialOccassion: "Birthday",
      menuAvalible:[]
    }
  ];

  const cateringList = [
    {
      cateringCustomer: [],
      cateringAddress: "412 Van Rd, Salem OR 12122",
      cateringDate: "06-23-2022 5:30 PM",
      cateringMenu: [],
      cateringPartySize: 11,
    },

    {
      cateringCustomer: [],
      cateringAddress: "333 Palm Rd, Salem OR 13122",
      cateringDate: "10-31-2022 12:00 AM",
      cateringMenu: [],
      cateringPartySize: 66,
    },

    {
      cateringCustomer: [],
      cateringAddress: "891 Park Rd, Salem OR 14442",
      cateringDate: "01-20-2022 6:30 PM",
      cateringMenu: [],
      cateringPartySize: 10,
    },

    {
      cateringCustomer: [],
      cateringAddress: "222 Snail Ave, Salem OR 12112",
      cateringDate: "09-28-2022 4:30 PM",
      cateringMenu: [],
      cateringPartySize: 23,
    },
  ];
  const reviewList = [
    {
      firstName: "Rudolf",
  	  lastName: "Thereindeer",
      rating: 5,
  	  image_url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-081221-chef-salad-03-landscape-jg-1631045032.jpg",
  	  comment: "Food was tasty, so much yum.",
  	  menuAvalible: [],
      password:"coolMan97"
    },
    {
      firstName: "Harry",
  	  lastName: "Weasly",
	    rating: 4.5,
  	  image_url:"https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2Farchive%2F3b432b41ce04c96a08d77befa42b9881a587a436",
     	comment: "The food was amazing, but I think I saw a rat on the chefs head.",
  	  menuAvalible: [],
      password:"chicken"
    },
    {
      firstName:"Naruto",
      lastName:"JirayaSensei",
      rating: 5,
      image_url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-081221-chef-salad-03-landscape-jg-1631045032.jpg",
      comment: "Almost as good as Ichiraku Ramen.",
      menuAvalible: [],
      password:"banana"
    },
    {
      firstName:"Alyssa",
      lastName: "Kittle",
      rating: 4.3,
      image_url: "/images/raspberrypie.jpg",
      comment: "Waitstaff slapped me across the face and yelled at me, but the food was delicious.",
      menuAvalible: [],
      password:"apple"
    }
  ];

  
  //--------------------------------------------
  //Connect to DB with Mongoose
  const credentials = require("./dbCredentials.js");
  const mongoose = require("mongoose");
  mongoose.connect(credentials.connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  //Load our models
  const Menu = require("./models/menu.js");
  const MenuItem = require("./models/menuItem.js");
  const Customer = require("./models/customer.js");
  const Reservation = require("./models/reservation.js");
  const Review = require("./models/reviews.js")
  const Catering = require("./models/catering.js");
  const { signedCookie } = require("cookie-parser");
  
  //Async function so we can use await to synchronize steps
  async function loadAllRecords() {
    //Delete all existing records
    await Menu.deleteMany();
    await MenuItem.deleteMany();
    await Customer.deleteMany();
    await Reservation.deleteMany();
    await Catering.deleteMany();
    await Review.deleteMany();
  
    const allMenus = [];
    const allMenuItems = [];
    const allCustomers = [];
    const allReservations = [];
    const allCatering = [];
    const allReviews = [];
  
    for (let menusItem of menuList) {
    
      const singleMenu = new Menu(menusItem);
     
      allMenus.push(singleMenu);
      
      await singleMenu.save();
    }
    for (let menuItemItem of menuItemList) {
    
      const singleMenuItem = new MenuItem(menuItemItem);
      
      allMenuItems.push(singleMenuItem);
      singleMenuItem.current_menus = allMenus[0];
      
      await singleMenuItem.save();
    }
    let j = 0;
    for (let customerItem of customerList) {
    
      const singleCustomer = new Customer(customerItem);
      allCustomers.push(singleCustomer);
      singleCustomer.customerCateringOrders = allCatering[j];
      singleCustomer.customerReservations= allReservations[j];
      singleCustomer.customerFavoriteFoods= allMenuItems[j];
      await singleCustomer.save();
     
    }

    let itemLoc = 0;
    for (let cateringItem of cateringList) {
      const singleCater = new Catering(cateringItem);
      allCatering.push(singleCater);
      singleCater.cateringCustomer = allCustomers[itemLoc];
      singleCater.cateringMenu = allMenus[3];

      itemLoc++;
      await singleCater.save();
    }
     let i = 0;
    for (let reservationItem of reservationList) {
      const singleReservation = new Reservation(reservationItem);
      allReservations.push(singleReservation);
      singleReservation.customer = allCustomers[i];
      if(menuList[i].title == "Catering"){
        singleReservation.menuAvalible = allMenus[i-1];
      }else{
        singleReservation.menuAvalible = allMenus[i];
      }
      i++;
      await singleReservation.save();
    }

    i = 0;
    for (let reviewItem of reviewList) {
      const singleReview = new Review(reviewItem);
      allReviews.push(singleReview);
      if(menuList[i].title == "Catering"){
        singleReview.menuAvalible = allMenus[i-1];
      }else{
        singleReview.menuAvalible = allMenus[i];
      }
      i++;
      await singleReview.save();
    }

  
    console.log("Done loading data");
    
    mongoose.connection.close();
  }
  
  loadAllRecords();