const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "api_key=d6989fddf7eb51e1d127c771f7ebb04c";
const SEARCH_URL = BASE_URL + "search/movie?" + API_KEY;
const DETAIL_MOVIE_URL = BASE_URL + "movie/"
const IMAGE_URL="https://image.tmdb.org/t/p";
const IMAGE_SIZE="/w500";
const TRENDING_MOVIE=BASE_URL + "trending/movie/";
const VIDEOS = BASE_URL + "movie/"

export {API_KEY,SEARCH_URL,IMAGE_URL,IMAGE_SIZE,DETAIL_MOVIE_URL,TRENDING_MOVIE,VIDEOS}