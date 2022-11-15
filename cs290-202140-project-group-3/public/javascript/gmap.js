//need this function to inilitiaze the map, load coordinates and data
function initMap() {

  //directions
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  //set map options

var salemLoc = { lat: 44.9429, lng:-123.0351 };
var mapOptions = {
  center: salemLoc,
  zoom: 12,
  

};

//create map

var map = new google.maps.Map(document.getElementById("map"), mapOptions);


// The marker, positioned at Salem
const marker = new google.maps.Marker({
  position: salemLoc,
  map: map,
  title: "Albacari",
  //draggable: true
});

//makes a tooltip with information at the marker when clicked
const infowindow = new google.maps.InfoWindow({
    content: '<h1>Albacari</h1>' + '<p>420 Fake Street</p>' + '<p>Salem, OR 97302</p>',
  });

  //click event for marker
  marker.addListener("click", () => {
    infowindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });
  });


  // //add markers to google maps by clicking on map
  // map.addListener("click", (e) => {
  //   placeMarkerAndPanTo(e.latLng, map);
  // });

  // function placeMarkerAndPanTo(latLng, map) {
  //   new google.maps.Marker({
  //     position: latLng,
  //     map: map,
  //   });
  //   map.panTo(latLng);
  // }

  



  // Set LatLng and title text for the markers.
  const customers = [
    [{ lat: 44.8229, lng: -123.2251 }, "Bamber Bird"],
    [{ lat: 44.9100, lng: -123.0359 }, "Johnny Brabo"],
    [{ lat: 44.7433, lng: -123.3361 }, "Hakuna Matata"],
    [{ lat: 44.9567, lng: -123.4341 }, "Donny Wepp"],
  ];
  // Create an info window to share between markers.
  const infoWindow = new google.maps.InfoWindow();

  // Create the markers.
  customers.forEach(([position, title], i) => {
    const marker = new google.maps.Marker({
      position,
      map,
      title: `${title}`,
      label: `${i + 1}`,
      optimized: false,
    });

    // Add a click listener for each marker, and set up the info window.
    marker.addListener("click", () => {
      infoWindow.close();
      infoWindow.setContent(marker.getTitle());
      infoWindow.open(marker.getMap(), marker);
    });
  });




  //directions
  directionsRenderer.setMap(map);

  //calculate and display when directions are entered
  const onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };

  //gets starting and ending location from html
  document.getElementById("start").addEventListener("change", onChangeHandler);
  document.getElementById("end").addEventListener("change", onChangeHandler);
}

//function to calculate and display route
function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  directionsService
    .route({
      origin: {
        query: document.getElementById("start").value,
      },
      destination: {
        query: document.getElementById("end").value,
      },
      travelMode: google.maps.TravelMode.DRIVING, //mode can be changed to bicycling, Transit, Walking (all caps)
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + status));

}






window.initMap = initMap


