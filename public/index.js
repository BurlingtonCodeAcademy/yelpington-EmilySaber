//leaflet variable
let myMap = L.map("mapid").setView([42.368151, -71.097156], 14);
//tile layer import
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(myMap);

//marker for restaurants on map
let oleana = L.marker([42.370513, -71.097148]).addTo(myMap);
let lifeAlive = L.marker([42.366573, -71.105309]).addTo(myMap);
let ssRestaurant = L.marker([42.373382, -71.099966]).addTo(myMap);
let littleDonkey = L.marker([42.36427, -71.101583]).addTo(myMap);
let lonestarTacoBar = L.marker([42.371967, -71.08697]).addTo(myMap);
let cafeLuna = L.marker([42.362855, -71.094188]).addTo(myMap);

//these are the small pop up winds that will pop up when you click on a marker
// set to be closed by default
oleana
  .bindPopup(
    "<a href='http://localhost:8000/restaurant.html#oleana'>Oleana</a>"
  )
  .closePopup();
lifeAlive
  .bindPopup(
    "<a href='http://localhost:8000/restaurant.html#life-alive'>Life Alive</a>"
  )
  .closePopup();
ssRestaurant
  .bindPopup(
    "<a href='http://localhost:8000/restaurant.html#s&s-restaurant'>S&S Restaurant</a>"
  )
  .closePopup();
littleDonkey
  .bindPopup(
    "<a href='http://localhost:8000/restaurant.html#little-donkey'>Little Donkey</a>"
  )
  .closePopup();
lonestarTacoBar
  .bindPopup(
    "<a href='http://localhost:8000/restaurant.html#lonestar-taco-bar'>Lonestar Taco Bar</a>"
  )
  .closePopup();
cafeLuna
  .bindPopup(
    "<a href='http://localhost:8000/restaurant.html#cafe-luna'>Cafe Luna</a>"
  )
  .closePopup();

//create fetch to lay out each restauarant in the nav bar that also links to a page about that restaurant
//DOM query to grab sidebar
let sidebarRestaurants = document.getElementById("sidebar");

//fetch the array of restaurant objects
fetch("/api/restaurants")
  .then((res) => {
    return res.json();
  })
  .then((allRestaurants) => {
    //for each object in this array lets name it restaurant
    allRestaurants.forEach((restaurant) => {
      //since we are looping this will get each name value that we can present on our webpage
      let name = restaurant.name;

      //creating elements for our DOM to present the restaurant name on the page as a header/link
      let anchor = document.createElement("a");
      let restaurantTag = document.createElement("h3");

      //what these headers/links will contain
      anchor.href = "restaurant.html#" + restaurant.id;
      restaurantTag.textContent = name;

      //appending them to the page inside of our sidebar div so we can see 'em
      anchor.appendChild(restaurantTag);
      sidebarRestaurants.appendChild(anchor);
    });
  });
