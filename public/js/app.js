console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");

const phragraphOne = document.querySelector("#p1");
const phragraphTwo = document.querySelector("#p2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = searchElement.value;

  phragraphTwo.textContent = "Loading...";
  phragraphOne.textContent = "";

  fetch(`http://localhost:3000/weather/?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          phragraphTwo.textContent = data.error;
        } else {
          phragraphOne.textContent = data.location;
          phragraphTwo.textContent = data.weatherData;
        }
      });
    }
  );
});
