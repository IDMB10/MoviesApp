const URLAPI = 'https://api.themoviedb.org/3';
const URLImagesPost = 'https://image.tmdb.org/t/p/w300'

async function getTrendingMoviesPreview() {
    const response = await fetch(`${URLAPI}/trending/movie/day?api_key=${ApiKeyV3}`);
    const data = await response.json();

    const movies = data.results;

    const trendingPreviewMovieContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');

    const moviesArray = movies.map(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', `${URLImagesPost}/${movie.poster_path}`);

        movieContainer.appendChild(movieImg);

        return movieContainer;
    });
    trendingPreviewMovieContainer.append(...moviesArray);
}

async function getTrendingCategoriesPreview() {
    const response = await fetch(`${URLAPI}/genre/movie/list?api_key=${ApiKeyV3}`);
    const data = await response.json();

    const categories = data.genres;

    const PreviewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');

    const categoryArray = categories.map(category => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', `id${category.id}`);
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);

        categoryContainer.appendChild(categoryTitle);

        return categoryContainer;
    });
    PreviewCategoriesContainer.append(...categoryArray);
}

getTrendingMoviesPreview();
getTrendingCategoriesPreview();