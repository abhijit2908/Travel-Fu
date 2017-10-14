//global variables

var temp;
var location;
var icon;
var date;
var icnCounter = 0;

$('body').on("click", "#submit",function(){
    emptyResults();
    setTimeout(createButtons,500);//this is avoid showing the C and F buttons before the weather forecast appears
    var buttonMsg = $("#buttons");
    buttonMsg.html("Choose the unit for the forecast");
});



$('body').on("click", "#Celsius", function(){
   
    emptyResults();
    var units="metric";
    callWeatherAPI(units);
    setTimeout(createButtons,500);
});



$('body').on("click", "#Fahrenheit", function(){
      emptyResults();
      var units="imperial";
      callWeatherAPI(units);
      setTimeout(createButtons,500);
});



function emptyResults(){
        $("#date").empty();
        $("#location").empty();
        $("#temp").empty();
        $("#icon").empty();
        $("#wind").empty();
        $("#humidity").empty();
        $("#buttons").empty();
        $(".tabResults").empty();
        
}




function callWeatherAPI(units){
   var APIKey = "166a433c57516f51dfab1f7edaed8413";
            var cityName = $("#search").val().trim();
             

            var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" + "q=" + cityName + "&units=" + units + "&mode=json&appid=" + APIKey;
           
            $.getJSON({
              url: queryURL,
              method: "GET"
            })
            .done(function(response) {

                    createWeather(response);
            })

  };



function createWeather(response){

  // console.log(response);
  // console.log("Forecast in " + response.city.name );


        var location =$("#location");
        location.html("<strong><h4> Forecast in " + response.city.name + "</h4></strong>" + "<br>");
        location.css({ 'color': '#000000', 'font-size': '80%','font-family': 'calibri','background-color': '#b8a837', 'text-align': 'center'});
        location.addClass("row col-md-10 col-md-offset-1");




    for (var i = 0; i < 39; i= i+8) {


            var weather = {};

            weather.date = moment(response.list[i].dt_txt).format("dddd, MMMM Do YYYY")
            weather.temp = response.list[i].main.temp;
            weather.temp_min = response.list[i].main.temp_min;
            weather.temp_max = response.list[i].main.temp_max;
            weather.description = response.list[i].weather[0].description;
            weather.icon = response.list[i].weather[0].icon;

            displayWeather(weather);


    }

}


function displayWeather(weather){

      // console.log("Line 144 " + weather.date);



      var date = $("#date");
      date.addClass("row");




      $('table tr:last')
    .after(
        '<tr class="tabResults"><td>'  + weather.date
    +   '</td><td>' + weather.temp_min
      + '</td><td>' + weather.temp_max
      + '</td><td id=iconImg' +  icnCounter + '></td></tr>'

  )
 
 $("#iconImg"+ icnCounter + "").append('<img src="http://openweathermap.org/img/w/'+ weather.icon + '.png">');

 // console.log("icnCounter = " + icnCounter);
    icnCounter++;

}





function createButtons(){

      var buttons = $("#buttons");

      var c = $("<button>");
      c.addClass("btn btn-primary col-md-5");
      c.height(40);
      c.html("Celsius");
      c.attr('id','Celsius');
      buttons.append(c);
      
      var f = $("<button>");
      f.addClass("btn btn-primary col-md-5 col-md-offset-1");
      f.height(40);
      f.html("Fahrenheit");
      f.attr('id','Fahrenheit');
      buttons.append(f);


}