// api/TMDBApi.js

const API_TOKEN = "ecb0c9d3850659d960b3e38aa29696a4";

export function getFilmsFromApiWithSearchedText(query : String, page: Number) {
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_TOKEN}&language=fr&query=${query}&page=${page}`)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

export function getImageFromAPI (imageName: String) {
    return `https://image.tmdb.org/t/p/w300${imageName}`
}

export function getFilmDetail(id) {
    return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_TOKEN}&language=fr`)
        .then((response) => response.json())
        .catch((error) => console.log(error));
}

export function getNewReleases(page: Number) {
    return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_TOKEN}&vote_count.gte=1000&sort_by=release_date.desc&language=fr&page=${page}`)
        .then((response) => response.json())
        .catch((error) => console.log(error))
}