//imports
const express = require("express");
const app = express();
const path = require("path");

//global port variable
const port = process.env.PORT || 8000;

//homepage route
app.use(express.static("./public"));

//handle get requests
//all restaurants
app.get("/api", (req, res) => {
  res.sendFile(path.resolve("./api/all-restaurants.json"));
});

//array of all restaurant objects
app.get("/api/restaurants", (req, res) => {
  res.sendFile(path.resolve("./api/restaurants.json"))
})

//single restaurants
app.get("/api/:name", (req, res) => {
  let name = req.params.name;
  if (
    name === "cafe-luna" ||
    name === "oleana" ||
    name === "life-alive" ||
    name === "s&s-restaurant" ||
    name === "lonestar-taco-bar" ||
    name === "little-donkey"
  ) {
    res.sendFile(path.resolve(`./api/${name}.json`));
  } else {
    res.status(404).send({ message: "RESTAURANT NOT FOUND" });
  }
});

//start the server
app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
