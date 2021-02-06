
var albumTag = document.querySelector("#discography");
var daCount = 0; 
var searches = [];

renderSearch()

function renderSearch() {
    
  var searchList = document.querySelector("#prev-searches"); 
  searchList.innerHTML = '';
  
  var storedSearches = JSON.parse(localStorage.getItem("searches"));
  if (storedSearches !== null) {
      
      searches = storedSearches;

    }

    for (var i = searches.length - 1; i >= searches.length -3; i--) {
      
      
      var theSearch = searches[i];
  
      var li = document.createElement("li");
      li.textContent = theSearch;
      li.className = "list-group-item";
      searchList.appendChild(li);

    }
}

$('#search-btn').click(function(){

  var theArtist = $("#search-bar").val();
  var theCount = "6";
  var queryURL ="https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/" + theArtist;
  
  console.log(queryURL)

  searches.push(theArtist);
  localStorage.setItem("searches", JSON.stringify(searches));
  renderSearch()
  
  // Reset API Data View
  $("#albums").html("");
  daCount = 0;

  // Main API Call to retrieve Artist ID from Deezer
  $.getJSON( queryURL, function( Response ) {
    
    console.log(Response)
    var newURL = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/" + Response.id + "/albums&limit=" + theCount;

    // Secondary API Call to retrieve Albums using the retrieved Artist ID 
    $.getJSON( newURL, function( newResponse ) {
      
      // Looping over an array of Album tracks      
      for (var i = 0; i < newResponse.data.length; i++) {
        
        var listURL ="https://cors-anywhere.herokuapp.com/" + newResponse.data[i].tracklist;

        $.getJSON( listURL, function( listResponse ) {
            // Call Render List to render the albums (newResponse) and the tracks for each album (listResponse) 
            renderList(newResponse, listResponse);

        });

        $('html, body').animate({
          scrollTop: $("#albums").offset().top - 500

        }, 1);

        
      }
    });
  });
});


function renderList(albums, tracks) {
    
  console.log(albums.data)

    // console.log(albums.data[i].title)
 
    var albumDiv = $("<div>");
    albumDiv.addClass("large-auto track-toggle")
    albumDiv.attr('id', daCount);

    var albumTitle = $("<div>");
    albumTitle.addClass("text-center album-title")

    var albumRelease = $("<div>");
    albumRelease.addClass("text-center release-date")

    var albumImg = $("<img>");
    albumImg.addClass("float-center album-img")
    albumImg.attr("src",albums.data[daCount].cover_big);

    var theTitle = albums.data[daCount].title
    var theRelease = albums.data[daCount].release_date
   
    $('#albums').append(albumDiv);

    $(albumDiv).append(albumImg);
    $(albumDiv).append(albumTitle);
    $(albumDiv).append(albumRelease);

    albumTitle.text(theTitle);
    albumRelease.text(theRelease);
  
    var trackList = $("<ul>");

    trackList.addClass("vertical menu accordion-menu album-" + daCount)
    trackHeaderHolder = $("<li>");

    trackHeader = $("<a>");
    // trackHeader.addClass("track-toggle")
    // trackHeader.attr('id', daCount);
    // trackHeader.text("View Tracks");

    trackHeaderHolder.append(trackHeader);
    $(trackList).append(trackHeaderHolder);
    $(albumDiv).append(trackList);

    for(var i = 0; i < tracks.data.length; i ++)
    {
      track = $("<li>");
      track.addClass("hidden track-unit unit-" + daCount)
      track.text(tracks.data[i].title);
      $(trackList).append(track);
    }

    daCount++

  }



  $(document).on('click', '.track-unit', function(){
      
      var theArtist = $("#search-bar").val();
      var theSong = $(this).text()

      var theURL ="https://api.lyrics.ovh/v1/" + theArtist + "/" + theSong;
    
      $.ajax({
        url: theURL,
        method: "GET",
      }).then(function (response) {
        console.log(response);
    
        
        document.getElementById("lyrics-text").innerHTML = response.lyrics.replace(
          new RegExp("\n", "g"),
          "<br>"
        );

        var popup = new Foundation.Reveal($('#lyric-modal'));
        popup.open();

      });


  })


  $(document).on('click', '.track-toggle', function(){
    
    var albumID = this.id

    if( $(this).hasClass("show"))
    {
      $(this).removeClass("show");
      $(".unit-" + albumID).addClass("hidden");
    }
    else
    {
      $(this).addClass("show");
      $(".unit-" + albumID).removeClass("hidden");
    }  

  });
