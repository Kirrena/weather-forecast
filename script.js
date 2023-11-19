//create url for getting the coordinates of a city
var geoUrl = "https://api.opencagedata.com/geocode/v1/json?";
      var city = "q=" + encodeURIComponent("london");
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
    
  });
  }