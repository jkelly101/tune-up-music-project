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
