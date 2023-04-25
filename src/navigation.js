window.addEventListener('hashchange', navigator, false);
window.addEventListener('DOMContentLoaded', navigator, false);


function navigator() {
    const hash = window.location.hash;

    if (hash.startsWith('#trends')) {
        trendsPage();
    } else if (hash.startsWith('#search=')) {
        searchPage();
    } else if (hash.startsWith('#movie=')) {
        movieDetailsPage();
    } else if (hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    }
}

function homePage() {
    getTrendingMoviesPreviewAxios();
    getTrendingCategoriesPreviewAxios();
}

function categoriesPage() {
}

function movieDetailsPage() {
}

function searchPage() {
}

function trendsPage() {
}