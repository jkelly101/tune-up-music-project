// var albumTag = document.querySelector("#discography");

// var results = {
//   // API results here
//   q: [
//     {
//       // img: src="https://placekitten.com/200/200";
//       name: "Nevermind",
//       year: 1992,
//       artist: "Nirvana",
//       tracks: [
//         {
//           name: "Smells like teen spirit",
//           track: 1,
//         },
//         {
//           name: "Heart-shaped box",
//           track: 2,
//         },
//       ],
//     },
//   ],
// };

// var albumStats = results.q;
// console.log(albumStats);

// 

// renderList(results);

var albumTag = document.querySelector("#discography");
var daCount = 0; 


$('#search-btn').click(function(){

  var theArtist = $("#search-bar").val();
  var theCount = "5";
  var queryURL ="https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/" + theArtist;
  
  // Reset API Data View
  $("#albums").html("");
  daCount = 0;

  $.ajax({
    url: queryURL,
    crossDomain: true,
    method: "GET",
    contentType: "application/json",
    dataType: "json",
    headers: {
      "accept": "application/json",
      "Access-Control-Allow-Origin":"*"
      }
  }).then(function (Response) {
    var newURL =
      "https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/" +
      Response.id +
      "/albums&limit=" +
      theCount;

    $.ajax({
      url: newURL,
      crossDomain: true,
      method: "GET",
      contentType: "application/json",
      dataType: "json",
      headers: {
        "accept": "application/json",
        "Access-Control-Allow-Origin":"*"
        }
    }).then(function (newResponse) {


      for (var i = 0; i < newResponse.data.length; i++) {
        
        var listURL ="https://cors-anywhere.herokuapp.com/" + newResponse.data[i].tracklist;

        $.ajax({
          url: listURL,
          crossDomain: true,
          method: "GET",
          contentType: "application/json",
          dataType: "json",
          headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
            }

        }).then(function (listResponse) {
          for (var t = 0; t < listResponse.data.length; t++) {                       
            // console.log(listResponse.data[t].title);
          }

          renderList(newResponse, listResponse);

        });
      }

     

    });
  });
});


function renderList(albums, tracks) {
    
  console.log(albums.data)

    // console.log(albums.data[i].title)
 
    var albumDiv = $("<div>");
    albumDiv.addClass("column column-block")

    var albumTitle = $("<div>");
    albumTitle.addClass("text-center album-title")

    var albumRelease = $("<div>");
    albumRelease.addClass("text-center release-date")

    var albumImg = $("<img>");
    albumImg.addClass("float-center album-img")
    albumImg.attr("src",albums.data[daCount].cover_medium);

    var theTitle = albums.data[daCount].title
    var theRelease = albums.data[daCount].release_date
   
    $('#albums').append(albumDiv);

    $(albumDiv).append(albumImg);
    $(albumDiv).append(albumTitle);
    $(albumDiv).append(albumRelease);

    albumTitle.text(theTitle);
    albumRelease.text(theRelease);

    
    var trackList = $("<ul>");

    // var trackList = $("<div>");
    // trackList.html('<ul class="tracklist-' + daCount +  ' vertical menu accordion-menu" data-accordion-menu ></ul>')

    trackList.addClass("vertical menu accordion-menu")
    trackHeaderHolder = $("<li>");

    trackHeader = $("<a>");
    trackHeader.attr('id', 'Album' + daCount);
    trackHeader.text("View Tracks");

    trackHeaderHolder.append(trackHeader);

    // anotherList =  $("<ul>").addClass('menu vertical nested');
    // trackHeaderHolder.append(trackHeader, anotherList);
    // $('.tracklist-' + daCount).append(trackHeaderHolder)

    
    $(albumDiv).append(trackList);
    // $('.tracklist-1').append(trackHeaderHolder);
    // $(trackHeaderHolder).append(trackHeader);

    for(var i = 0; i < tracks.data.length; i ++)
    {
      track = $("<li>");
      track.addClass("hidden track-unit")
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
      });
  })




// var results = {
//   // API results here
//   q: [
//     {
//       // img: src="https://placekitten.com/200/200";
//       name: "Nevermind",
//       year: 1992,
//       artist: "Nirvana",
//       tracks: [
//         {
//           name: "Smells like teen spirit",
//           track: 1,
//         },
//         {
//           name: "Heart-shaped box",
//           track: 2,
//         },
//       ],
//     },
//   ],
// };

// renderList(results);



// albumTag.innerHTML = albums.map((album) => {
//   var trackhtml = album.tracks
//     .map((track) => `<li>${track.name}</li>`)
//     .join("");
//   return `
//    <div class="cell small-4 album">
//       <h4>${album.name}</h4>
//       <h5>${album.year}</h5>
//       <ul>
//           ${trackhtml}
//       </ul>
//    </div>
//    `;
// });