const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');
    

const music = new Audio();

const songs = [
    {
        path: './assets/XXXTENTACION - SAD! - XXXTENTACION (youtube).mp3',
        displayName: 'Sad',
        cover: './img/xxxtentation-sad.jpg',
        artist: 'Xxxtentation',
    },
    {
        path: './assets/videoplayback (1).m4a',
        displayName: 'Dusk Till Dawn',
        cover: './img/artworks-000405545727-arfwqx-t1080x1080.jpg',
        artist: 'Zayn Malik',
    },
    {
        path: './assets/videoplayback.m4a',
        displayName: 'Lovely',
        cover: './img/Billie-eilish-lovely1080x1080.jpg',
        artist: 'Billie Eilish | Khalid',
    },
    {
        path: './assets/videoplayback (2).m4a',
        displayName: 'See You Again',
        cover: './img/Wiz_Khalifa_Feat._Charlie_Puth_-_See_You_Again_(Official_Single_Cover).png',
        artist: 'Wiz Khalifa | Charlie Puth',
    },
    {
        path: './assets/videoplayback (3).m4a',
        displayName: 'Mood',
        cover: './img/mood.jpeg',
        artist: '24kGoldn',
    },
    {
        path: './assets/videoplayback (4).m4a',
        displayName: 'Ghost',
        cover: './img/justin-ghost.jpg',
        artist: 'Justin Bieber',
    },
    {
        path: './assets/videoplayback (5).m4a',
        displayName: 'Another Love',
        cover: './img/tomodell-anotherlove.jpeg',
        artist: 'Tom Odell',
    },
    {
        path: './assets/videoplayback (6).m4a',
        displayName: 'Gods Plan',
        cover: './img/drake-godsplan.jpg',
        artist: 'Drake',
    },
    {
        path: './assets/videoplayback (7).m4a- ',
        displayName: 'Roxanne',
        cover: './img/roxanne.jpeg',
        artist: 'Arizona Zervas',
    },
];

let currentSongIndex = 0;
let isPlaying = false;

playBtn.addEventListener('click', playORpause);
function playORpause() {
    if (isPlaying) { // currently isPlaying is false , so it goes to else block
        pauseMusic();
    } else {
        playMusic(); // it goes to play music
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}
loadMusic(songs[currentSongIndex]);

prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
function changeMusic(direction) {
    currentSongIndex = (currentSongIndex + direction + songs.length) % songs.length;
    loadMusic(songs[currentSongIndex]);
    playMusic();
}

music.addEventListener('timeupdate', updateProgressBar);
function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

playerProgress.addEventListener('click', setProgressBar);
function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

