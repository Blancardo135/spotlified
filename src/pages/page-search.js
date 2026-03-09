import { searchSongs } from '../api.js'
import { playSong } from '../player.js'
import { getFavorite, addFavorite, removeFavorite, getFavorites } from '../favorites.js';

customElements.define("page-search", class extends HTMLElement {
    connectedCallback() {
        const query = decodeURIComponent(this.getAttribute('query'));

        searchSongs(query)
            .then((songs) => {
                this.innerHTML = `
          <h4>
            Résultats pour : ${query}
          </h4>

          <div class="list">
          </div>
        `
                const songList = this.querySelector('.list')
                // Itérer le tableau d'artistes reçus et créer les éléments correspondants
                songs.forEach((song) => {
                    const songItem = document.createElement('song-item')
                    songItem.setAttribute('favorite', getFavorite(song.id) ? "true" : "false")
                    songItem.setAttribute('title', song.title)
                    songList.append(songItem)

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
