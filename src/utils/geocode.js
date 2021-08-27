const request = require("postman-request");

const requestGeocode = (address, callback) => {
  // encodeURIComponent => special charaters changes on the URL'S
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiamVzdXNhY2V2ZWRvIiwiYSI6ImNrc29xazI5cDAxYnkyeHFod2Fyd3phbHcifQ.UK01Om5iXMBzczsSexJZrQ&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to MapBox services!", undefined);
    } else if (!body.features[0]) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      let longitude = body.features[0].center[0];
      let latitude = body.features[0].center[1];
      let location = body.features[0].place_name;
      callback(undefined, { longitude, latitude, location });
    }
  });
};

module.exports = requestGeocode;
