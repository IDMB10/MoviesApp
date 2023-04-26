const URLAPI = 'https://api.themoviedb.org/3';
const URLImagesPost = 'https://image.tmdb.org/t/p/w300'
const URLImagesPostDetail = 'https://image.tmdb.org/t/p/w500'

const axiosObject = axios.create({
    baseURL: URLAPI,
    params: {
        'api_key': ApiKeyV3
    }
});

//Utils
function CreateMovies(movies, container) {
    container.innerHTML = '';

    const moviesArray = movies.map(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}`;
        })

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', `${URLImagesPost}/${movie.poster_path}`);

        movieContainer.appendChild(movieImg);

        return movieContainer;
    });
    container.append(...moviesArray);
}

function CreateCategories(categories, container) {
    container.innerHTML = '';

    const categoryArray = categories.map(category => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', `id${category.id}`);
        categoryTitle.onclick = () => { location.hash = `#category=${category.id}-${category.name}` };
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);

        categoryContainer.appendChild(categoryTitle);

        return categoryContainer;
    });
    container.append(...categoryArray);
}

//Llamados API
async function getTrendingMoviesPreview() {
    const response = await fetch(`${URLAPI}/trending/movie/day?api_key=${ApiKeyV3}`);
    const data = await response.json();

    const movies = data.results;
    CreateMovies(movies, trendingMoviesPreviewList);
}

async function getTrendingCategoriesPreview() {
    const response = await fetch(`${URLAPI}/genre/movie/list?api_key=${ApiKeyV3}`);
    const data = await response.json();
    const categories = data.genres;
    CreateCategories(categories, categoriesPreviewList);
}

async function getTrendingMoviesPreviewAxios() {
    const { data } = await axiosObject('/trending/movie/day')
    const movies = data.results;
    CreateMovies(movies, trendingMoviesPreviewList);
}

async function getTrendingCategoriesPreviewAxios() {
    const { data } = await axiosObject('/genre/movie/list');
    const categories = data.genres;

    CreateCategories(categories, categoriesPreviewList);
}

async function getMoviesByCategory(idCategory) {
    const { data } = await axiosObject('/discover/movie?', {
        params: {
            with_genres: idCategory
        }
    })
    const movies = data.results;
    CreateMovies(movies, genericSection);
}

async function getMoviesBySearch(queryValue) {
    const { data } = await axiosObject('/search/movie?', {
        params: {
            query: queryValue
        }
    })
    const movies = data.results;
    CreateMovies(movies, genericSection);
}

async function getTrendingMovies() {
    const response = await fetch(`${URLAPI}/trending/movie/day?api_key=${ApiKeyV3}`);
    const data = await response.json();

    const movies = data.results;
    CreateMovies(movies, genericSection);
}

async function getMovieById(id) {
    const { data: movie } = await axiosObject(`/movie/${id}`);

    const urlImage = `${URLImagesPostDetail}/${movie.poster_path}`;
    headerSection.style.background = `
    linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.35) 19.27%,
        rgba(0, 0, 0, 0) 29.17%
      ),
      url(${urlImage})`;

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    CreateCategories(movie.genres, movieDetailCategoriesList);
    getRelatedMoviesById(id);
}

async function getRelatedMoviesById(id) {
    const { data } = await axiosObject(`/movie/${id}/similar`);

    const relatedMovies = data.results;

    CreateMovies(relatedMovies, relatedMoviesContainer);
}