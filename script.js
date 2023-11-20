//display buttons from existing localStorage cities
$(document).ready(function() {

  createbuttonforexistinglocalstoragecities();
  

});

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
//calling getcoordinates function
getcoordinates(inputCity);
//clearing the input field
$("#search-input").val("");
//clear today display area
todayEl.empty();

});

function getcoordinates(cityname){
//create url for getting the coordinates of a city
var geoUrl = "https://api.opencagedata.com/geocode/v1/json?";
      //encoded to ready to use as URL
      var city = "q=" + encodeURIComponent(cityname);
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


};



  

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

//use for to inspect the weather forcast looking for daily change in object.list[j].dt_txt
for (j=0; j<weatherdata.list.length; j++){
  var nextDay = dayjs().add(1,'day').format("YYYY-MM-DD");
  console.log("Next day:", nextDay);

  if (weatherdata.list[j].dt_txt.includes(dayjs().add(1,'day').format("YYYY-MM-DD"))) {
    var date1 = $("<div/>");
    date1.text(dayjs().add(1,'day').format("DD/MM/YYYY"));
    var icon1 = $("<img/>");
    icon1.attr("src", "http://openweathermap.org/img/wn/" + weatherdata.list[j].weather[0].icon + ".png");
    icon1.css("width", "10px");
    var temp1Div = $("<div/>");
    var temp1C = weatherdata.list[j].main.temp-273.15;
    temp1Div.text("Temp: " + temp1C.toFixed(2) + "Celsius");
    var wind1Div = $("<div/>");
    wind1Div.text("Wind: "+ weatherdata.list[j].wind.speed + "KPH");
    var hum1Div = $("<div/>");
    hum1Div.text("Humidity: "+ weatherdata.list[j].main.humidity + "%");
    forecastEl.append(date1, icon1, temp1Div, wind1Div, hum1Div);
    return j;
  }
   
}


//store city in a variable
var stored = weatherdata.city.name;

  //store city in a variable
addtohistory(stored);
}

//function to creating history buttons
function addtohistory(data){
  var existingCities = JSON.parse(localStorage.getItem("cities")) || [];
  if (!existingCities.includes(data)) {
  // Add the new city to the array 
    existingCities.push(data);
    // Save the updated array back to localStorage
    localStorage.setItem("cities", JSON.stringify(existingCities));
  

  //select history div to display buttons
  
  var historyButton = $("<button/>");
  historyButton.attr("class", "history-btn");
  historyButton.text(data);
  //add to localStorage
  // Retrieve the existing cities from localStorage
  
    historyEl.append(historyButton);
  }
    //console.log(existingCities);
  }
    
  

// clicking on history button
$("#history").on("click", ".history-btn", function(){
  //clear todayEl
  todayEl.empty();
  var clickedCity = $(this).text();

  // Calling getcoordinates function
  getcoordinates(clickedCity);
    });

    //function to retrieve data from localStorage for creating buttons in history field
function createbuttonforexistinglocalstoragecities(){
    if(JSON.parse(localStorage.getItem("cities"))){
      for (var i =0 ; i<(JSON.parse(localStorage.getItem("cities"))).length ; i++){
      var historyButton = $("<button/>");
      historyButton.attr("class", "history-btn");
      historyButton.text(JSON.parse(localStorage.getItem("cities"))[i]);
      historyEl.append(historyButton);
    }
  }
}   

//creating clear button to clear history
var clearButton = $("<button/>");
clearButton.text("Delete history");
clearButton.attr("class", "clear btn btn-primary btn-search");
$("#history").append(clearButton);

//eventlistener on clear button
$("#history").on("click", ".clear", function(){
  //clear all display area
  historyEl.empty();
  todayEl.empty();
  forecastEl.empty();
  // Remove the "cities" key from localStorage
  localStorage.removeItem("cities");
});