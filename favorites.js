// Function to add a manga to favorites
function addToFavorites(title, image) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Check for duplicates
    const exists = favorites.some(item => item.title === title);
    if (!exists) {
        favorites.push({ title, image });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(title + " added to favorites!");
    } else {
        alert(title + " is already in favorites!");
    }
}

// Function to display favorites on favorites.html
function displayFavorites() {
    const favoritesList = document.getElementById('favorites-list');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!favoritesList) return;

    if (favorites.length === 0) {
        favoritesList.innerHTML = "<p class='text-center'>No favorites added yet.</p>";
        return;
    }

    favoritesList.innerHTML = '';

    favorites.forEach(function(manga, index) {
        const div = document.createElement('div');
        div.classList.add('card', 'mb-3', 'shadow-sm');

        div.innerHTML =
            '<div class="row g-0">' +
                '<div class="col-md-4 d-flex justify-content-center align-items-center">' +
                    '<div class="emoji-icon" style="font-size: 3rem;">✨</div>' + // image removed, emoji added
                '</div>' +
                '<div class="col-md-8">' +
                    '<div class="card-body">' +
                        '<h5 class="card-title">' + manga.title + '</h5>' +
                        '<button class="btn btn-danger" onclick="removeFavorite(\'' + manga.title + '\')">Remove</button>' +
                    '</div>' +
                '</div>' +
            '</div>';
        favoritesList.appendChild(div);
    });
}


// Function to remove a favorite
function removeFavorite(title) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = favorites.filter(item => item.title !== title);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    displayFavorites();
}

// Function to open favorites in a new tab
function openFavorites() {
    window.open('favorites.html', '_blank');
}

// Function to toggle favorites
function toggleFavorite() {
    const title = document.querySelector('h2.text-gold').innerText;
    // Get the src attribute value
    const image = document.querySelector('.img-fluid').getAttribute('src');
    console.log("Title:", title);
    console.log("Image Path:", image);

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const exists = favorites.some(item => item.title === title);

    if (!exists) {
        addToFavorites(title, image);
    } else {
        removeFavorite(title);
        alert(title + " removed from favorites!");
    }
}
