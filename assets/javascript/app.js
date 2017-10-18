// Weather.js

//global variables
var temp;
var location;
var icon;
var date;
var icnCounter = 0;

$('body').on("click", "#submit",function(){
  emptyResults();
  var buttonMsg = $("#buttons");
  buttonMsg.html("Choose the unit for the forecast");
});

$('body').on("click", "#Celsius", function(){
  emptyResults();
  var units="metric";
  callWeatherAPI(units);
});

$('body').on("click", "#Fahrenheit", function(){
  emptyResults();
  var units="imperial";
  callWeatherAPI(units);
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
};

function callWeatherAPI(units){
  var APIKey = "166a433c57516f51dfab1f7edaed8413";
  var cityName = $("#search").val().trim();
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?" + "q=" + cityName + "&units=" + units + "&mode=json&appid=" + APIKey + "&cnt=5";
  $.getJSON({
    url: queryURL,
    method: "GET"
  })
  .done(function(response) {
          createWeather(response);
  });

};

function createWeather(response){


 //console.log(response);
  // console.log("Forecast in " + response.city.name );


        var location =$("#location");
        location.html("<strong><h4> Forecast in " + response.city.name + "</h4></strong>" + "<br>");
        location.css({ 'color': '#000000', 'font-size': '80%','font-family': 'calibri', 'text-align': 'center'});
        location.addClass("row col-md-10 col-md-offset-1");




    for (var i = 0; i < 5; i++) {


            var weather = {};

            weather.date = moment.unix(response.list[i].dt).format("dddd, MMMM Do YYYY")
            //weather.temp = response.list[i].temp.day;
            weather.temp_min = response.list[i].temp.min;
            weather.temp_max = response.list[i].temp.max;
            weather.description = response.list[i].weather[0].description;
            weather.icon = response.list[i].weather[0].icon;

            console.log("Temp Min " + weather.temp_min);
            console.log("Temp Max " + weather.temp_max);
            displayWeather(weather);


    }

}



function displayWeather(weather){

  var date = $("#date");
  date.addClass("row");

  $('table tr:last').after(
    '<tr class="tabResults"><td>'  + weather.date
    + '</td><td>' + weather.temp_min
    + '</td><td>' + weather.temp_max
    + '</td><td id=iconImg' +  icnCounter + '></td></tr>'
  );
  $("#iconImg"+ icnCounter + "").append('<img src="http://openweathermap.org/img/w/'+ weather.icon + '.png">');
  icnCounter++;

};

// ====================================================================================================================
// News.js
// ====================================================================================================================

var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

var searchTerm = "";
var numResults = 5;
var calc = moment().format('L').split('/');
var day = calc[2]+calc[0]+calc[1];
var calc2 = moment().subtract(7, 'days').calendar().split('/');
var week = calc2[2]+calc2[0]+calc2[1];;
var calc3 = moment().subtract(29, 'days').calendar().split('/');
var month = calc3[2]+calc3[0]+calc3[1];
var currentArr = [];
var newQueryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=";
var articleCounter = 0;
var long_short = true; 
$('#layout').on('click',function(){
  if(long_short){
    $('#layout').text('Short');
  }else{
    $('#layout').text('Long');
  }
  long_short = !long_short;
});
$("#submit").on("click", function(event) {
  event.preventDefault();
  articleCounter = 0;
  $("#news-api").empty();
  $('#pages').empty();
  searchTerm = $("#search").val().trim().split(',')[0];
  var searchURL = newQueryURL + searchTerm;
  getInfo(searchURL);
  if(!long_short){
    setTimeout(runQuery, 500);
  }
});
//-------------------------------
$("#today").on("click", function(event) {
  event.preventDefault();
  articleCounter = 0;
  $("#news-api").empty();
  $('#pages').empty();
  searchTerm = $("#search").val().trim().split(',')[0];
  var searchURL = newQueryURL + searchTerm;
  searchURL = searchURL + "&begin_date=" + day ;
  getInfo(searchURL);
  if(!long_short){
    setTimeout(runQuery, 500);
  };
});
//-------------------------------
$("#seven").on("click", function(event) {
  event.preventDefault();
  articleCounter = 0;
  $("#news-api").empty();
  $('#pages').empty();
  searchTerm = $("#search").val().trim().split(',')[0];
  var searchURL = newQueryURL + searchTerm; 
  searchURL = searchURL + "&begin_date=" + week +"&end_date=" + day ;
  getInfo(searchURL);
  if(!long_short){
    setTimeout(runQuery, 500);
  };
});

//-------------------------------
$("#month").on("click", function(event) {
  event.preventDefault();
  articleCounter = 0;
  $("#news-api").empty();
  $('#pages').empty();
  searchTerm = $("#search").val().trim().split(',')[0];
  var searchURL = newQueryURL + searchTerm;
  searchURL = searchURL + "&begin_date=" + month + "&end_date=" + day;
  getInfo(searchURL);
  if(!long_short){
    setTimeout(runQuery, 500);
  };
});
//-------------------------------
function getInfo(queryURL){
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(NYTData1) {
    if (long_short){
      for (var i = 0; i < numResults; i++) {
        articleCounter++;
        var wellSection = $("<div>");
        wellSection.addClass("well");
        wellSection.attr("id", "article-well-" + articleCounter);
        $("#news-api").append(wellSection);

        if (NYTData1.response.docs[i].headline !== "null") {
          $("#article-well-" + articleCounter)
          .append(
            "<h3 class='articleHeadline'><span class='label label-primary'>" +
            articleCounter + "</span><strong> " +
            NYTData1.response.docs[i].headline.main + "</strong></h3>"
            );

        }

        if (NYTData1.response.docs[i].byline && NYTData1.response.docs[i].byline.original) {
          $("#article-well-" + articleCounter)
          .append("<h5>" + NYTData1.response.docs[i].byline.original + "</h5>");

        }

        $("#article-well-" + articleCounter)
        .append("<h5>Section: " + NYTData1.response.docs[i].section_name + "</h5>");
        $("#article-well-" + articleCounter)
        .append("<h5>" + NYTData1.response.docs[i].pub_date + "</h5>");
        $("#article-well-" + articleCounter)
        .append(
          "<a href='" + NYTData1.response.docs[i].web_url + "'>" +
          NYTData1.response.docs[i].web_url + "</a>"
          );
      }
    }else{
      if(NYTData1.response.docs.length){
        for (var i = 0; i < numResults; i++) {
          currentArr[i] = {
            content:NYTData1.response.docs[i].headline.main,
            section:NYTData1.response.docs[i].section_name,
            date:NYTData1.response.docs[i].pub_date,
            urll:NYTData1.response.docs[i].web_url
          };
          if(typeof(NYTData1.response.docs[i].byline)!=='undefined'){
            if(NYTData1.response.docs[i].byline.original==null){
              currentArr[i].by = 'By Unknown';
            }else{
              currentArr[i].by = NYTData1.response.docs[i].byline.original;
            };
          }else{
            currentArr[i].by = 'By Unknown';
          };
          var numbers = $('<button>')
          numbers.addClass('btn btn-default btn-primary btn-info page-size');
          numbers.attr('page',i);
          numbers.text(i+1);
          $('#pages').append(numbers);
        };
      } else {
        currentArr = [];
        currentArr[0] = {
          content: 'Please Enter Valid City, State'
        };
      };
      $('.label-primary').on('click',function(){
        $("#news-api").empty();
        articleCounter = this.getAttribute('page');
        setTimeout(runQuery, 500);  
      });
    };
  });
};

function runQuery() {
  var wellSection = $("<div>");
  wellSection.attr("id", "subArticle");
  $("#news-api").append(wellSection);

  if (currentArr[articleCounter].content !== "null") {
    $("#subArticle")
      .append(
        "<h3 class='articleHeadline'><strong> " +
        currentArr[articleCounter].content + "</strong></h3>"
      );
  };

  if (currentArr[articleCounter].by!=='undefined') {
    $("#subArticle")
      .append("<h5>" + currentArr[articleCounter].by + "</h5>");
  };

  if (currentArr[articleCounter].section) {
    $("#subArticle")
      .append("<h5>Section: " + currentArr[articleCounter].section + "</h5>");
  };

  if (currentArr[articleCounter].date) {
    $("#subArticle")
      .append("<h5>" + currentArr[articleCounter].date + "</h5>");
  };

  if (currentArr[articleCounter].urll) {
    $("#subArticle")
      .append(
        "<a href='" + currentArr[articleCounter].urll + "'>" +
        currentArr[articleCounter].urll + "</a>"
      );
  };

};

// ====================================================================================================================
// Maps.js
// ====================================================================================================================


var map;
var searchmap;

var markers=[];
function initMap() {
  map = new google.maps.Map(document.getElementById('mapsarea'), {
    zoom: 10,
    center: {lat: 35.787743, lng: -78.644257}
  });
  var marker = new google.maps.Marker({
        map:map,
        position:map.center,
        title:"Initial Position"
      });
  markers.push(marker);
     
    //Search Autocomplete Functionality
  var input = document.getElementById('search');
  var autocomplete = new google.maps.places.Autocomplete(input);
        
  var infoWindow = new google.maps.InfoWindow;
     

  // Try HTML5 geolocation.This allows maps to tell uesrs current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      deleteMarkers();
      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      var yourLocoMarker = new google.maps.Marker({
        map: map,
        position: pos,
        title: "Your location"
      });
      infoWindow.open(map);
      map.setCenter(pos);
      markers.push(yourLocoMarker);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  };

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

  //Geocoder function helps display place searched.
        
  var geocoder = new google.maps.Geocoder(); 
    $('body').on('click','#submit', function() {
      geocodeAddress(geocoder, map);
    }); 
};
       // 
       //  

function geocodeAddress(geocoder, resultsMap) {
      
  var address = document.getElementById('search').value;
  deleteMarkers()
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      resultsMap.setZoom(13);  
      var  searchedMarker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location,
        title:address
      });
      markers.push(searchedMarker)
    } else {
      $('#myModal').modal("show");
    };
  });
};
  

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
   markers[i].setMap(map);
  };
};

function clearMarkers() {
  setMapOnAll(null);
};

function showMarkers() {
  setMapOnAll(map);
};

function deleteMarkers() {
  clearMarkers();
  markers = [];
};




// ====================================================================================================================
// Firebase.js
// ====================================================================================================================

// Initialize Firebase
var config = {
apiKey: "AIzaSyBw2bE_pxCWSJM0zdkhUtouRJfqjGfZgxc",
authDomain: "fir-campers.firebaseapp.com",
databaseURL: "https://fir-campers.firebaseio.com",
projectId: "fir-campers",
storageBucket: "",
messagingSenderId: "396436072298"
};
firebase.initializeApp(config);

var database = firebase.database();

// global variables
var userEmail;
var userPassword;
var uid;
var currentUser;
var modal;

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(function() {
    // Existing and future Auth states are now persisted in local storage. User must hit the sign out button to log out.
    // ...
    // New sign-in will be persisted with local persistence.
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });

$("#userLogin").on("click", function() {
  // captures input email and password and clears those fields
  var email = $("#userEmail").val().trim();
  var password = $("#userPassword").val().trim();
  $("#userEmail").val("");
  $("#userPassword").val("");
  modal = 1;
  // checks if new user box is checked
  if ($("#newUser").is(":checked")) {
    $("#newUser").prop("checked", false);
    // creates new user in firebase
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  } else {
    // signs in user with correct email and password credentials
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  };
  
});

$("#userLogOut").on("click", function() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    modal = 1;
    $("#userEmail").show();
    $("#userPassword").show();
    $("#userCheckbox").show();
    $("#userLogin").show();
  }).catch(function(error) {
    // An error happened.
    console.log("Error.");
  });
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    // Only show modal on first sign in, not after every page refresh
    if (modal == 1) {
      $("#signIn").modal("show");
    };
    $("#userEmail").hide();
    $("#userPassword").hide();
    $("#userCheckbox").hide();
    $("#userLogin").hide();
    $("#sidebar").show();
    modal++;
    currentUser = firebase.auth().currentUser;
    if (currentUser !== null) {
      email = currentUser.email;
      uid = currentUser.uid;
      // Display which user is logged in
      $("#currentUser").html("<h5>Welcome: " + email + "</h5>");
      $("#submit").on("click", function(event) {
        event.preventDefault();
        if ($("#search").val().trim() !== "") {
          var search = $("#search").val().trim();
        };
        database.ref(uid + "/searches").push({
          location: search,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
      });
      // Prepend to recent searches only the last five searches on reload
      database.ref(uid + "/searches").orderByChild("dateAdded").limitToLast(5).on("child_added", function(snapshot) {
        $("#userSearches").prepend("<a>" + snapshot.val().location + "</a><br><br>");
      });
    };
  } else {
    // No user is signed in.
    // Only show modal on first click
    if (modal == 1) {
      $("#signOut").modal("show");
    };
    modal++;
    // clear all user data
    $("#userSearches").empty();
    $("#currentUser").empty();
    $("#sidebar").hide();
  }
});

// User can click on recent searches to search again
$("#userSearches").on("click", "a", function() {
  event.preventDefault();
  var search = $(this).text();
  $("#search").val(search);
  $("#submit").trigger("click");
});


// ===========================================================================================================================
// Fixed sidebars
// ===========================================================================================================================


$(function() {
  var $sidebar   = $("#sidebar"); 
  var $window    = $(window);
  var offset     = $sidebar.offset();
  var topPadding = 15;
  $window.scroll(function() {
    if ($window.scrollTop() > offset.top) {
      $sidebar.stop().animate({
        marginTop: $window.scrollTop() - offset.top + topPadding
      });
    } else {
      $sidebar.stop().animate({
        marginTop: 0
      });
    };
  });
});

$(function() {
  var $sidebar   = $("#sidebar2"); 
  var $window    = $(window);
  var offset     = $sidebar.offset();
  var topPadding = 95;
  $window.scroll(function() {
    if ($window.scrollTop() > offset.top) {
      $sidebar.stop().animate({
        marginTop: $window.scrollTop() - offset.top + topPadding
      });
    } else {
      $sidebar.stop().animate({
        marginTop: 0
      });
    };
  });
});

