var trackTag = document.querySelector(".albums");

var results = {
  q: [
    {
      name: "Nevermind",
      year: 1992,
      artist: "Nirvana",
      tracks: [
        {
          name: "Smells like teen spirit",
          track: 1,
        },
        {
          name: "Heart-shaped box",
          track: 2,
        },
      ],
    },
  ],
};

var albumList = results.q;
console.log(albumList);

function renderList(albums) {
  trackTag.innerHTML = albums.map((album) => {
    var trackhtml = album.tracks
      .map((track) => `<li>${track.name}</li>`)
      .join("");
    return `
     <div class="col-2 album">
        <h3>${album.name}</h3>
        <h4>${album.year}</h4>
        <ul>
            ${trackhtml}
        </ul>
     </div>
     `;
  });
}

renderList(albumList);


var theArtist = 'Eminem'
var theCount = '5'
var queryURL = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/' + theArtist 

function findlyrics()
{               
    
    var theURL = "https://api.lyrics.ovh/v1/" + document.getElementById("artist").value + "/" + document.getElementById("title").value;

    $.ajax({   
        url: theURL,
        method: "GET"    
        
    }).then(function(response) {
        console.log(response)

    document.getElementById("output").innerHTML=response.lyrics.replace(new RegExp("\n", "g"),"<br>")

    });
}

$.ajax({
    url: queryURL,
    method: "GET",
    contentType: 'application/json',
    dataType: 'json'

    }).then(function(Response) {                       
        
        var newURL = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/' + Response.id + '/albums&limit=' + theCount
    
        $.ajax({
            url: newURL,
            method: "GET",
            contentType: 'application/json',
            dataType: 'json'

            }).then(function(newResponse) {
                
                console.log(newResponse)
            
                for(var i = 0; i < newResponse.data.length; i++)
                {
                    
                    console.log(newResponse.data[i].title)
                    var listURL = 'https://cors-anywhere.herokuapp.com/' + newResponse.data[i].tracklist;

                    
                    $.ajax({
                        url: listURL,
                        method: "GET",
                        contentType: 'application/json',
                        dataType: 'json'

                        }).then(function(listResponse) {                               

                            for(var i = 0; i < listResponse.data.length; i++)
                            {
                                console.log(listResponse.data[i].title)
                            }
                                                
                        })

                }
                
            })

    })
