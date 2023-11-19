//select the actual day display area
var todayEl = $("#today");
//select the 5day forecast display area
var forecastEl = $("#forecast");
//select history area
var historyEl = $("#history");
//set today in a variable
var today = dayjs().format("DD/MM/YYYY");
//check today
//console.log(today);


//add eventlistener on search button
$("#search-form").on("click", "#search-button",function(event){
event.preventDefault();
//getting data from input field
var inputCity = $("#search-input").val();
//check City
//console.log(inputCity);


//create url for getting the coordinates of a city
var geoUrl = "https://api.opencagedata.com/geocode/v1/json?";
      var city = "q=" + encodeURIComponent(inputCity);
      var geoKey = "&key=" + "20c415a2405347b593680460e03ca811";
      var queryUrl1 =geoUrl+city+geoKey;
      
// run Fetch call to the OpenCageData API
fetch(queryUrl1)
  .then(function (response) {
    // Calling .json() to access the json data stored inside the returned promise
    return response.json();
  })
  // We store all of the retrieved data inside of an object called "data"
  .then(function (data){
    getweather (data.results[0].geometry);
  });

//clearing the input field
$("#search-input").val("");
//clear today display area
todayEl.empty();
});



  

  function getweather(coordinates){
  //create url for openweathermap
  var baseUrl = "https://api.openweathermap.org/data/2.5/forecast?";
  var latitude = "lat=" + coordinates.lat;//latitude from other site
  var longitude = "&lon=" + coordinates.lng;//longitude from other website
  var key = "&appid=" + "1c7e61a3aacff2b6b77f23236641adae";  
  var queryUrl = baseUrl + latitude + longitude + key;
  console.log(queryUrl);

  // run Fetch call to the openweathermap API
  fetch(queryUrl)
  .then(function (response) {
    // Calling .json() to access the json data stored inside the returned promise
    return response.json();
  })
  // We store all of the retrieved data inside of an object called "data"
  .then(function (data){
     
     displayForecast(data);
  });
  }

function displayForecast(weatherdata){

 console.log(weatherdata);
  //create a div to display the city
var cityDiv = $("<div/>");
cityDiv.text(weatherdata.city.name + " " + today);
  //create a img element to display icon
icon = $("<img/>");
icon.attr("src", "http://openweathermap.org/img/wn/" + weatherdata.list[0].weather[0].icon + ".png");
  //create a div to display temperature
var tempDiv = $("<div/>");
var tempC = weatherdata.list[0].main.temp-273.15;
tempDiv.text("Temp: " + tempC.toFixed(2) + "Celsius");
    //create a div to display wind
var windDiv = $("<div/>");
windDiv.text("Wind: "+ weatherdata.list[0].wind.speed + "KPH");
  //create a div to display humidity
var humDiv = $("<div/>");
humDiv.text("Humidity: "+ weatherdata.list[0].main.humidity + "%");
todayEl.append(cityDiv, icon, tempDiv, windDiv, humDiv);
//create an object to store data in localStorage
var stored = {city: weatherdata.city.name, icon: "http://openweathermap.org/img/wn/" + weatherdata.list[0].weather[0].icon + ".png",
 temperature:  "Temp: " + tempC.toFixed(2) + "Celsius", wind: "Wind: "+ weatherdata.list[0].wind.speed + "KPH", humidity: "Humidity: "+ weatherdata.list[0].main.humidity + "%" };
addtohistory(stored);
}

function addtohistory(object){
  console.log(object);
  
}