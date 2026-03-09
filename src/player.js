let currentSong = null;
let currentSongs = null;
function playSong(song, songs) {
    const audio = document.querySelector('#audio-player')
    audio.src = song.audio_url;
    audio.play();
    currentSong = song;
    currentSongs = songs;
}

function nextSong(song, songs) {
    const index = songs.indexOf(song);
    if (index === songs.length - 1) {
        currentSong = songs[0];
    } else {
        currentSong = songs[index + 1];
    }
    playSong(currentSong, songs)
}

function previousSong(song, songs) {
    const index = songs.indexOf(song);
    if (index === 0) {
        currentSong = songs[songs.length - 1];
    } else {
        currentSong = songs[index - 1];
    }
    playSong(currentSong, songs)
}

const togglePlayPause = () => {
    const audio = document.querySelector('#audio-player')
    if (audio.paused)
        audio.play()
    else
        audio.pause()
}

export { playSong, nextSong, previousSong, togglePlayPause, currentSong, currentSongs };