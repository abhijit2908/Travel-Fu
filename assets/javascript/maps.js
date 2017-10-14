
var  map,infoWindow;
var markers=[];
function initMap() {
        map = new google.maps.Map(document.getElementById('mapsarea'), {
          zoom: 10,
          center: {lat: -34.397, lng: 150.644}
        });
        var marker = new google.maps.Marker({
              map:map,
              position:map.center,
              title:"Initial Position"
            });
        markers.push(marker);
        console.log("Initial Marker"+markers)
        //Search Autocomplete Functionality
      var input = document.getElementById('search');
      var autocomplete = new google.maps.places.Autocomplete(input);
        

       infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.This allows maps to tell uesrs current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      
      //infoWindow.setPosition(pos);
      //infoWindow.setContent('Location found.');
      //infoWindow.open(map);
      map.setCenter(pos);
      var yourLocoMarker = new google.maps.Marker({
              map:map,
              position:pos,
              title:"Your location"
              });
      	 markers.push(yourLocoMarker);
        console.log("yourLocoMarker"+markers)
      
    }, function() {
      handleLocationError(true, map.getCenter());
    });
    
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
        //infoWindow = new google.maps.InfoWindow;

  // // Try HTML5 geolocation.
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     var pos = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude
  //     };

  //     infoWindow.setPosition(pos);
  //     infoWindow.setContent('Location found.');
  //     infoWindow.open(map);
  //     map.setCenter(pos);
  //   }, function() {
  //     handleLocationError(true, infoWindow, );
      
  //   });
  // } else {
  //   // Browser doesn't support Geolocation
  //   handleLocationError(false, infoWindow, map.getCenter());
  // }


// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(browserHasGeolocation ?
//                         'Error: The Geolocation service failed.' :
//                         'Error: Your browser doesn\'t support geolocation.');
//   infoWindow.open(map);
// }


//Geocoder function helps display place searched.
        var geocoder = new google.maps.Geocoder();
         // console.log("has map initialized yes")
        
        document.getElementById('submit').addEventListener('click', function() {
          geocodeAddress(geocoder, map);
        });
      }
    
      function geocodeAddress(geocoder, resultsMap) {
      			deleteMarkers();
        var address = document.getElementById('search').value;
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
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }
  

  function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
   markers[i].setMap(map);
  }
}

function clearMarkers() {
  setMapOnAll(null);
}

function showMarkers() {
  setMapOnAll(map);
}

function deleteMarkers() {
  clearMarkers();
  markers = [];
}