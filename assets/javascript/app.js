

$(document).ready(function () {
  console.log("ready!");

  var movies = ["Bloodsport", "Delta Force", "Lethal Weapon 2", "Point Break", "Robocop", "Terminator 2",];

  function renderButtons() {
    $("#karate-view").empty();
    for (var i = 0; i < movies.length; i++) {
      var a = $("<button>");
      a.addClass("movie");
      a.attr("data-name", movies[i]);
      a.text(movies[i]);
      $("#karate-view").append(a);
    }
  }
  $("#add-movie").on("click", function (event) {
    event.preventDefault();
    var movie = $("#movie-input").val().trim();
    movies.push(movie);
    renderButtons();
  });

  renderButtons();

  $("#karate-view").on("click", ".movie", function () {

    var newMovie = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      newMovie + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .done(function (response) {
        console.log(queryURL);

        console.log(response);
        var results = response.data;

        for (var i = 0; i < results.length; i++) {

          var katrateDiv = $("<div>");

          var p = $("<p>").text("Rating: " + results[i].rating);

          var movieImage = $("<img>");
          movieImage.attr("src", results[i].images.fixed_height.url);

          katrateDiv.append(p);
          katrateDiv.append(movieImage);

          $("#gifs-appear-here").prepend(katrateDiv);
        }
      });
  });
});

