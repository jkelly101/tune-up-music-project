var albumTag = document.querySelector("#discography");

var results = {
  // API results here
  q: [
    {
      // img: src="https://placekitten.com/200/200";
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

var albumStats = results.q;
console.log(albumStats);

function renderList(albums) {
  albumTag.innerHTML = albums.map((album) => {
    var trackhtml = album.tracks
      .map((track) => `<li>${track.name}</li>`)
      .join("");
    return `
     <div class="cell small-4 album">
        <h4>${album.name}</h4>
        <h5>${album.year}</h5>
        <ul>
            ${trackhtml}
        </ul>
     </div>
     `;
  });
}

renderList(albumStats);
