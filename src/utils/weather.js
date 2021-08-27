const request = require("postman-request");

const weatherRequest = ({ logitude, latitude }, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=89d82e7894338b5c17e93da4f0e53afa&query=${logitude},${latitude}&units=f`;

  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to Weatherstack", undefined);
    } else if (response.body.error) {
      callback(response.body.error.info, undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degreess out. It feels like ${body.current.feelslike} degress out`
      );
    }
  });
};

module.exports = weatherRequest;
