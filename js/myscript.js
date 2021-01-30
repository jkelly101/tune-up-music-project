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

function findlyrics() {
  var theURL =
    "https://api.lyrics.ovh/v1/" +
    document.getElementById("artist").value +
    "/" +
    document.getElementById("title").value;

  $.ajax({
    url: theURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    document.getElementById("output").innerHTML = response.lyrics.replace(
      new RegExp("\n", "g"),
      "<br>"
    );
  });
}

$('#search-btn').click(function(){

  var theArtist = $("#search-bar").val();
  var theCount = "5";
  var queryURL ="https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/" + theArtist;
  

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

var daCount = 0;
  
function renderList(albums, tracks) {
  
  
  console.log(albums.data)


    // console.log(albums.data[i].title)
 
    var albumDiv = $("<div>");
    albumDiv.addClass("cell small-4 album")
    var theTitle = albums.data[daCount].title
   
    $('#discography').append(albumDiv);
    albumDiv.text(theTitle);

    daCount++
  }



  // console.log(albums)
  // albumTag.innerHTML = albums.map((album) => {
  //   return `
  //    <div class="cell small-4 album">
  //       <h4>${album.data.id}</h4>
  //    </div>
  //    `;
  // });


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