var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

// These variables will hold the results we get from the user's inputs via HTML
var searchTerm = "";
var numResults = 0;
var startDate = moment().format('L').split('/').join('');;
var endYear = 0;

var newQueryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  authKey + "&q=";


$("#today").on("click", function(event) {

  event.preventDefault();

  articleCounter = 0;

  $("#news-api").empty();
  searchTerm = $("#search").val().trim();
  var searchURL = newQueryURL + searchTerm;

  numResults = $("#num-records-select").val();

  if (parseInt(startDate)) {
    searchURL = searchURL + "&begin_date=" + startYear ;
  }

  runQuery(numResults, searchURL);
});