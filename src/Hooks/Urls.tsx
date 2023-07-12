const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "api_key=d6989fddf7eb51e1d127c771f7ebb04c";
const SEARCH_URL = BASE_URL + "search/movie?" + API_KEY;
const DETAIL_MOVIE_URL = BASE_URL + "movie/"
const IMAGE_URL="https://image.tmdb.org/t/p";
const IMAGE_SIZE_500 = "/w500"
const IMAGE_SIZE_1920="/w1920_and_h800_multi_faces";
const TRENDING_MOVIE=BASE_URL + "trending/movie/";
const VIDEOS = BASE_URL + "movie/"
const DISCOVER_URL= BASE_URL + 'discover/movie?' + API_KEY 

export {BASE_URL,API_KEY,SEARCH_URL,IMAGE_URL,IMAGE_SIZE_1920,IMAGE_SIZE_500,DETAIL_MOVIE_URL,TRENDING_MOVIE,VIDEOS,DISCOVER_URL}