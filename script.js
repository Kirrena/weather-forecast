//create url for getting the coordinates of a city
var getGeoUrl = "https://api.opencagedata.com/geocode/v1/json?";
      var city = "q=" + encodeURIComponent("london");
      var getGeokey = "&key=" + "20c415a2405347b593680460e03ca811";
      var queryUrl1 =getGeoUrl+city+getGeokey;
      
// run Fetch call to the OpenCageData API
fetch(queryUrl1)
  .then(function (response) {
    // Calling .json() to access the json data stored inside the returned promise
    return response.json();
  })
  // We store all of the retrieved data inside of an object called "data"
  .then(function (data) {

    // Log the queryURL
    console.log(queryUrl1);

    // Log the coordinates
    console.log(data.results[0].geometry);

  });