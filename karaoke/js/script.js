// script.js
const songs = [
    { name: "Song 1", artist: "Artist 1", year: 2020, lyrics: "Some lyrics for Song 1." },
    { name: "Song 2", artist: "Artist 2", year: 2019, lyrics: "Some lyrics for Song 2." },
    { name: "Song 3", artist: "Artist 3", year: 2018, lyrics: "Some lyrics for Song 3." },
    // Add more songs here
];

const songList = document.getElementById('song-list');
const searchInput = document.getElementById('search');

// Function to display songs
function displaySongs(filteredSongs) {
    songList.innerHTML = '';
    filteredSongs.forEach((song, index) => {
        const songCard = document.createElement('div');
        songCard.classList.add('col-12', 'col-md-4', 'mb-4');

        songCard.innerHTML = `
            <div class="card" data-id="${index}">
                <div class="card-body">
                    <h5 class="card-title">${song.name}</h5>
                    <p class="card-text">${song.artist} (${song.year})</p>
                </div>
            </div>
        `;

        songCard.addEventListener('click', (e) => {
            const songId = e.currentTarget.getAttribute('data-id');
            localStorage.setItem('selectedSong', JSON.stringify(songs[songId])); // Save song data in local storage
            window.location.href = 'details.html'; // Redirect to the details page
        });

        songList.appendChild(songCard);
    });
}

// Initial display
displaySongs(songs);

// Search functionality
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filteredSongs = songs.filter(song => song.name.toLowerCase().includes(query));
    displaySongs(filteredSongs);
});