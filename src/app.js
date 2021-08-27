const path = require("path");
const express = require("express");
const hbs = require("hbs");
const weatherRequest = require("./utils/weather");
const requestGeocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 8000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Name
const name = "Antonio AM";

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name,
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name,
  });
});

app.get("/weather", (req, res) => {
  // console.log(req.query); // query params
  // console.log(req.params); // parameters

  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  requestGeocode(req.query.address, (error, geocodeData = {}) => {
    if (error) {
      return res.send({ error: error });
    }
    weatherRequest(geocodeData, (error, weatherData) => {
      const { longitude, latitude, location } = geocodeData;
      if (error) {
        return res.send({ error: error });
      }
      res.send({
        address: req.query.address,
        longitude,
        latitude,
        location,
        weatherData,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name,
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name,
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("App is running on port " + port);
});
