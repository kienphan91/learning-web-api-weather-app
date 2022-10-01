const key = "4e0fef0203cbe5eddd25b240091ea9a7";
let searchBox = document.querySelector(".search-box");
let city = document.querySelector(".city");
let date = document.querySelector(".date");
let weather = document.querySelector(".weather");
let temperature = document.querySelector(".temperature");
let highLow = document.querySelector(".high-low");

// event
searchBox.addEventListener("keydown", searchCity);

function searchCity(event) {
  if (event.key === "Enter") {
    getResponse(event.target.value);
  }
}

function getResponse(cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&&appid=${key}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      showResult(data);
    });
}

function showResult(weatherObject) {
  let today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  city.innerHTML =
    `${weatherObject.name}` + ", " + `${weatherObject.sys.country}`;
  weather.innerHTML = `${weatherObject.weather[0].main}`;
  temperature.innerHTML = `${weatherObject.main.temp.toFixed()}℃`;
  highLow.innerHTML = `Min ${weatherObject.main.temp_min.toFixed()}℃ / Max ${weatherObject.main.temp_max.toFixed()}℃`;
  date.innerHTML = `${today.toLocaleDateString("en-US", options)}`;
}
