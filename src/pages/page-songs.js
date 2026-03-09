import { getSongs } from '../api.js'
import { playSong } from '../player.js'
import { getFavorite } from '../favorites.js'
import { addFavorite } from '../favorites.js'
import { removeFavorite } from '../favorites.js'

customElements.define("page-artist-songs", class extends HTMLElement {
  connectedCallback() {
    const artistId = this.getAttribute('artist-id')

    getSongs(artistId)
      .then((songs) => {
        this.innerHTML = `
          <h4>
            Artistes > ${songs[0].artist.name}
          </h4>

          <div class="list">
          </div>
        `
        const songList = this.querySelector('.list')
        // Itérer le tableau d'artistes reçus et créer les éléments correspondants
        songs.forEach((song) => {
          const songItem = document.createElement('song-item')
          songItem.setAttribute("title", song.title)
          songItem.setAttribute('favorite', getFavorite(song.id) ? "true" : "false")
          songList.append(songItem)

          /* songItem.addEventListener('click', (e) => {
            const songItem = e.target.closest('song-item');
            const favoriteButton = e.target.closest('.favorite-button');
            if (!songItem || favoriteButton) return;
            playSong(song, songs);
          }) */

          songItem.addEventListener('play_click', () => {
            playSong(song, songs);
          })
          songItem.addEventListener('favorite_click', () => {
            if (getFavorite(song.id)) {
              removeFavorite(song.id)
              songItem.setAttribute('favorite', 'false')
            } else {
              addFavorite(song.id, song)
              songItem.setAttribute('favorite', 'true')
            }
          })
        })
      })
  }
})
