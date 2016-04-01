// wait for DOM to load before running JS
$(document).on('ready', function() {
  // check to make sure JS is loaded
  console.log('JS is loaded!');
  var source = $('#tracks-template').html();
  var template = Handlebars.compile(source);
  var $results = $("#results");
  $("form").on("submit", function (event){
       event.preventDefault();
       $("#results").empty();
       input();
     });

  function input () {
    $.ajax({

        // What kind of request
        method: "GET",

        // The URL for the request
        url: "https://api.spotify.com/v1/search",

        // The data to send aka query parameters
        data: $("form").serialize(),

        // Code to run if the request succeeds;
        // the response is passed to the function
        success: renderSpotifyData,

        // Code to run if the request fails; the raw request and
        // status codes are passed to the function
        error: onError
    });
    function renderSpotifyData(data) {
      // track results are in an array called `items`
      // which is nested in the `tracks` object
      var trackResults = data.tracks.items;
      console.log(trackResults);
      // pass in data to render in the template
      var trackHtml = template({ tracks: trackResults });
      // append html to the view
      $results.append(trackHtml);
    }
  }
    function onError(xhr, status, errorThrown) {
        alert("Sorry, there was a problem!");
        console.log("Error: " + errorThrown);
        console.log("Status: " + status);
        console.dir(xhr);
    }
});

//     if (songs.length > 0) {
//     songs.forEach(function(element) {
//       $("#results").append('<p>' + '<img src=' +
//       element.album.images[0].url + '>' + ' ' + element.name + ' by ' +
//       element.artists[0].name + '</p>');
//     });
//   } else {
//      $("#results").append('<p class="text-center">No results</p>');
//   }
