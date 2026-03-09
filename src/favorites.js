const favorites = localStorage;

const addFavorite = (id, song) => {
    favorites.setItem(id, JSON.stringify(song))
}

const getFavorite = (id) => {
    return favorites.getItem(id) && JSON.parse(favorites.getItem(id))
}

const removeFavorite = (id) => {
    favorites.removeItem(id);
}

const getFavorites = () => {
    const favoritesTab = [];
    for (let i = 0; i < favorites.length; i++) {
        const key = favorites.key(i);
        try {
            const value = JSON.parse(favorites.getItem(key));
            if (value && value.id) favoritesTab.push(value); // on vérifie que c'est bien une chanson
        } catch (e) {
            // on ignore les clés qui ne sont pas du JSON valide
        }
    }
    return favoritesTab;
}

export { addFavorite, removeFavorite, getFavorite, getFavorites }


