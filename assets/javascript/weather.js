


$('body').on("click", "#submit", function(){
	var APIKey = "166a433c57516f51dfab1f7edaed8413";

	var cityName = $("#search").val().trim();

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" +
      "q=" + cityName + "&units=imperial&mode=json&appid=" + APIKey;




  	$.ajax({
        url: queryURL,
        method: "GET"
      })
      // We store all of the retrieved data inside of an object called "response"
      .done(function(response) {


        console.log(queryURL);
        console.log(response);

      
       	console.log("Forecast in " + response.city.name );
       	console.log("Date of Forecast is " + response.list[0].dt_txt );
       	console.log("Temp is " + response.list[0].main.temp );

      });
});