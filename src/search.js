const searchButton = document.querySelector("#search-trigger");
const searchInput = document.querySelector("#search-input");

searchButton.addEventListener("click", () => {
    searchInput.classList.add("active");
    searchInput.focus();
});

searchInput.addEventListener("change", () => {
    const query = searchInput.value.trim();
    window.location.hash = '#search/' + encodeURIComponent(query);
})