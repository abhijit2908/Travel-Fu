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
var currentArr = [];
var newQueryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  authKey + "&q=";
  var articleCounter = 0;

// $(document).on('click','.label-primary',function(){
//   console.log(this.attr(page))
// })
// $(document).ready(function(){

// })
$("#submit").on("click", function(event) {

  event.preventDefault();

  articleCounter = 0;

  $("#news-api").empty();
  $('#pages').empty();
  searchTerm = $("#search").val().trim();
  var searchURL = newQueryURL + searchTerm;
  getInfo(searchURL);
  setTimeout(runQuery, 500);
});

$("#today").on("click", function(event) {

  event.preventDefault();

  articleCounter = 0;

  $("#news-api").empty();
  $('#pages').empty();
  searchTerm = $("#search").val().trim();
  var searchURL = newQueryURL + searchTerm;

    searchURL = searchURL + "&begin_date=" + day ;

  getInfo(searchURL);
  setTimeout(runQuery, 500);
});

$("#seven").on("click", function(event) {

  event.preventDefault();

  articleCounter = 0;

  $("#news-api").empty();
  $('#pages').empty();
  searchTerm = $("#search").val().trim();
  var searchURL = newQueryURL + searchTerm;
  // console.log(week)
  searchURL = searchURL + "&begin_date=" + week ;
  searchURL = searchURL + "&end_date=" + day;

  getInfo(searchURL);
  setTimeout(runQuery, 500);
});

$("#month").on("click", function(event) {

  event.preventDefault();

  articleCounter = 0;

  $("#news-api").empty();
  $('#pages').empty();
  searchTerm = $("#search").val().trim();
  var searchURL = newQueryURL + searchTerm;
  // console.log(month)
  searchURL = searchURL + "&begin_date=" + month ;
  searchURL = searchURL + "&end_date=" + day;

  getInfo(searchURL);
  setTimeout(runQuery, 500);
});


// if (parseInt(endYear)) {
//-------------------------------

function getInfo(queryURL){
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(NYTData1) {
    for (var i = 0; i < numResults; i++) {
      currentArr[i] = {
        content:NYTData1.response.docs[i].headline.main,
        by:NYTData1.response.docs[i].byline.original,
        section:NYTData1.response.docs[i].section_name,
        date:NYTData1.response.docs[i].pub_date,
        urll:NYTData1.response.docs[i].web_url
      }
      // console.log(currentArr,'fdsf');
      var numbers = $('<span>')
      numbers.addClass('label label-primary');
      numbers.attr('page',i);
      numbers.text(i+1);
      $('#pages').append(numbers);
    }
    $('.label-primary').on('click',function(){
      $("#news-api").empty();
      articleCounter = this.getAttribute('page');
      setTimeout(runQuery, 500);
      
    })
  });
}


function runQuery() {

      var wellSection = $("<div>");
      wellSection.addClass("well");
      wellSection.attr("id", "subArticle");
      $("#news-api").append(wellSection);
      // console.log(currentArr.length)

      if (currentArr[articleCounter].content !== "null") {
        $("#subArticle")
          .append(
            "<h3 class='articleHeadline'><strong> " +
            currentArr[articleCounter].content + "</strong></h3>"
          );
      }

      if (currentArr[articleCounter].by) {
        $("#subArticle")
          .append("<h5>" + currentArr[articleCounter].by + "</h5>");
      }

      if (currentArr[articleCounter].section) {
        $("#subArticle")
          .append("<h5>Section: " + currentArr[articleCounter].section + "</h5>");
      }

      if (currentArr[articleCounter].date) {
        $("#subArticle")
          .append("<h5>" + currentArr[articleCounter].date + "</h5>");
      }

      if (currentArr[articleCounter].urll) {
        $("#subArticle")
          .append(
            "<a href='" + currentArr[articleCounter].urll + "'>" +
            currentArr[articleCounter].urll + "</a>"
          );
      }

}