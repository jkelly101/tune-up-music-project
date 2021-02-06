{/* <input type="text" id="title"> by <input type="text" id="artist">
<button onclick="findlyrics();">Find Lyrics</button>
<div id="output"></div> */}
 
    function findlyrics(){
        console.log('hi');
        // var theURL = "https://api.lyrics.ovh/v1/" + document.getElementById("search-bar").value + "/" + document.getElementById("title").value;
        var theURL = "https://api.lyrics.ovh/v1/Michael-Jackson/Beat-It"
        $.ajax({   
            url: theURL,
            method: "GET"
        }).then(function(response) {
            console.log(response)
           document.getElementById("output").innerHTML=response.lyrics.replace(new RegExp("\n", "g"),"<br>")
        });
}
findlyrics()


