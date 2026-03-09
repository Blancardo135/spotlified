import { getSongs } from '../api.js'
import { playSong } from '../player.js'
import { getFavorites, addFavorite, getFavorite, removeFavorite } from '../favorites.js'

customElements.define("page-favorites", class extends HTMLElement {
  connectedCallback() {
    const favoritesTab = getFavorites();
    this.innerHTML = `
          <h4>
            Favoris : 
          </h4>
 
          <div class="list">
          </div>
        `
    const songList = this.querySelector('.list')
    favoritesTab.forEach(song => {
      console.log(favoritesTab)
      console.log(song)
      const songItem = document.createElement('song-item')
      songItem.setAttribute('title', song.title)
      songItem.setAttribute('favorite', 'true')
      songList.append(songItem)

      songItem.addEventListener('play_click', () => {
        playSong(song, favoritesTab);
      })

      songItem.addEventListener('favorite_click', () => {
        if (getFavorite(song.id)) {
          removeFavorite(song.id);
          songItem.remove();
        } else {
          addFavorite(song.id, song);
        }
      })
    })

  }
})

