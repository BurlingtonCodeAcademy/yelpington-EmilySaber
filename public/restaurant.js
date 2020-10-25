//DOM query to get all elements for fetch
let restaurantName = document.getElementById("name");
let restaurantAddress = document.getElementById("address");
let restaurantPhoneNum = document.getElementById("phone-num");
let restaurantHours = document.getElementById("hours");
let restaurantNotes = document.getElementById("notes");

//get the restaurant ID after the # for each page, respectively
let id = document.location.hash.slice(1);

//grab restaurant by id
fetch("/api/" + id)
  .then((res) => {
    return res.json();
  })
  //present each restaurant information below!
  .then((restObj) => {
    restaurantName.textContent = restObj.name;
    restaurantAddress.textContent = restObj.address;
    restaurantPhoneNum.textContent = restObj.phonenumber;
    restaurantHours.textContent = restObj.hours;
    let notes = restObj.notes;
    
    //to loop and seperate out each note
    notes.forEach((note) => {
      let noteInfo = document.createElement("p");
      noteInfo.textContent = note;
      restaurantNotes.appendChild(noteInfo);
    });

    //this is all to present a leaflet map based on what has been fetched (lat/long)
    let restLat = restObj.lat;
    let restLong = restObj.long;
    let myMap = L.map("mapid").setView([restLat, restLong], 15);
    const pin = L.marker([restLat, restLong]).addTo(myMap);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(myMap);
  });
