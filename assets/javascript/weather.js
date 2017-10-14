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

  console.log(response);
  console.log("Forecast in " + response.city.name );


        var location =$("#location");
        location.html("<strong><h4> Forecast in " + response.city.name + "</h4></strong>" + "<br>");
        location.css({ 'color': '#000000', 'font-size': '80%','font-family': 'calibri','background-color': '#b8a837', 'text-align': 'center'});
        location.addClass("row col-md-10 col-md-offset-1");


        // var table = $("<table>");



  //       
  //       console.log("line 87 " + table);
    
    // var header = "<tr><th>Date</th><th>Temp Min</th><th>Temp Max</th><th>Icon</th></tr>";
    // table.append(header);
       
        


        // console.log("line 91 " + header);


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

      console.log("Line 144 " + weather.date);



      var date = $("#date");
      date.addClass("row");



      // var p = $("<p>").text(weather.date);
      // p.css({ 'color': '#1f8116', 'font-size': '120%','font-family': 'calibri','background-color': 'yellow'});
      // p.addClass("row  col-md-10 col-md-offset-1");


      // var ptemp = $("<div>").text("Temp: " + weather.temp);
      // ptemp.css({ 'color': '#1f8116', 'font-size': '120%','font-family': 'calibri','background-color': 'pink'});
      // ptemp.addClass("row col-md-3 col-md-offset-1");

      // var temp_min = $("<div>").text("Min: " + weather.temp_min);
      // temp_min.css({ 'color': '#1f8116', 'font-size': '120%','font-family': 'calibri','background-color': 'grey'});
      // temp_min.addClass("row col-md-3 col-md-offset-1");

      // var temp_max = $("<div>").text("Max: " + weather.temp_max);
      // temp_max.css({ 'color': '#1f8116', 'font-size': '120%','font-family': 'calibri','background-color': 'orange'});
      // temp_max.addClass("row col-md-3 col-md-offset-1");

       // var pIcon = document.createElement('img');
       // //pIcon.attr("src", "http://openweathermap.org/img/w/" + weather.icon + ".png"); 
       // console.log("Line 150 " + "http://openweathermap.org/img/w/" + weather.icon + ".png");
       // console.log("Line 151 " + pIcon);
      // pIcon.attr("width", 120);
      // pIcon.attr("height", 150);
      // pIcon.addClass("row col-md-12");

      

      


      // // date.css({'border': '2px solid black'});


      // date.append(p);
      // date.append(ptemp);
      // date.append(temp_min);
      // date.append(temp_max);
      // date.append(pIcon);



      $('table tr:last')
    .after(
        '<tr class="tabResults"><td>'  + weather.date
    +   '</td><td>' + weather.temp_min
      + '</td><td>' + weather.temp_max
      + '</td><td id=iconImg' +  icnCounter + '></td></tr>'

  )
 
 $("#iconImg"+ icnCounter + "").append('<img src="http://openweathermap.org/img/w/'+ weather.icon + '.png">');

 console.log("icnCounter = " + icnCounter);
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