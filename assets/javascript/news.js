var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

// These variables will hold the results we get from the user's inputs via HTML
var searchTerm = "";
var numResults = 5;
var calc = moment().format('L').split('/');
var day = calc[2]+calc[0]+calc[1];
var calc2 = moment().subtract(7, 'days').calendar().split('/');
var week = calc2[2]+calc2[0]+calc2[1];;
var calc3 = moment().subtract(29, 'days').calendar().split('/');
var month = calc3[2]+calc3[0]+calc3[1];

var newQueryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  authKey + "&q=";


$("#submit").on("click", function(event) {

  event.preventDefault();

  articleCounter = 0;

  $("#news-api").empty();
  searchTerm = $("#search").val().trim();
  var searchURL = newQueryURL + searchTerm;
  
  runQuery(numResults, searchURL);
});

$("#today").on("click", function(event) {

  event.preventDefault();

  articleCounter = 0;

  $("#news-api").empty();
  searchTerm = $("#search").val().trim();
  var searchURL = newQueryURL + searchTerm;

    searchURL = searchURL + "&begin_date=" + day ;

  runQuery(numResults, searchURL);
});

$("#seven").on("click", function(event) {

  event.preventDefault();

  articleCounter = 0;

  $("#news-api").empty();
  searchTerm = $("#search").val().trim();
  var searchURL = newQueryURL + searchTerm;
  console.log(week)
  searchURL = searchURL + "&begin_date=" + week ;
  searchURL = searchURL + "&end_date=" + day;

  runQuery(numResults, searchURL);
});

$("#month").on("click", function(event) {

  event.preventDefault();

  articleCounter = 0;

  $("#news-api").empty();
  searchTerm = $("#search").val().trim();
  var searchURL = newQueryURL + searchTerm;
  console.log(month)
  searchURL = searchURL + "&begin_date=" + month ;
  searchURL = searchURL + "&end_date=" + day;

  runQuery(numResults, searchURL);
});


// if (parseInt(endYear)) {
//-------------------------------

function runQuery(numArticles, queryURL) {

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(NYTData) {

    // console.log("------------------------------------");
    // console.log("URL: " + queryURL);
    // console.log("------------------------------------");

    // console.log(NYTData);
    // console.log("------------------------------------");
    for (var i = 0; i < numArticles; i++) {
      articleCounter++;

      var wellSection = $("<div>");
      wellSection.addClass("well");
      wellSection.attr("id", "article-well-" + articleCounter);
      $("#news-api").append(wellSection);

      if (NYTData.response.docs[i].headline !== "null") {
        $("#article-well-" + articleCounter)
          .append(
            "<h3 class='articleHeadline'><span class='label label-primary'>" +
            articleCounter + "</span><strong> " +
            NYTData.response.docs[i].headline.main + "</strong></h3>"
          );

        console.log(NYTData.response.docs[i].headline.main);
      }

      if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.original) {
        $("#article-well-" + articleCounter)
          .append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");

        console.log(NYTData.response.docs[i].byline.original);
      }

      $("#articleWell-" + articleCounter)
        .append("<h5>Section: " + NYTData.response.docs[i].section_name + "</h5>");
      $("#articleWell-" + articleCounter)
        .append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
      $("#articleWell-" + articleCounter)
        .append(
          "<a href='" + NYTData.response.docs[i].web_url + "'>" +
          NYTData.response.docs[i].web_url + "</a>"
        );

      console.log(NYTData.response.docs[i].pub_date);
      console.log(NYTData.response.docs[i].section_name);
      console.log(NYTData.response.docs[i].web_url);
    }
  });

}


