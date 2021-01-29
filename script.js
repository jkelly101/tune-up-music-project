<input type="text" id="title"> by <input type="text" id="artist">
<button onclick="findlyrics();">Find Lyrics</button>
<div id="output"></div>
<script>
    function findlyrics(){
        var theURL = "https://api.lyrics.ovh/v1/" + document.getElementById("artist").value + "/" + document.getElementById("title").value;
        $.ajax({   
            url: theURL,
            method: "GET"
        }).then(function(response) {
            console.log(response)
           document.getElementById("output").innerHTML=response.lyrics.replace(new RegExp("\n", "g"),"<br>")
        });
}
</script>