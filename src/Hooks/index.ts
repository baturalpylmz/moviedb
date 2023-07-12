import axios from 'axios';
import { SEARCH_URL,DETAIL_MOVIE_URL,API_KEY,TRENDING_MOVIE,VIDEOS, DISCOVER_URL,BASE_URL } from './Urls';

export const searchAxiosMovie =(name:string)=>{
    return axios.get(`${SEARCH_URL+"&query="+name+'&language=tr'}`)
    .then(res=>{ return res.data.results })
}

export const getAxiosMovieDetails =(id:string)=>{
    return axios.get(`${DETAIL_MOVIE_URL+id+'?'+API_KEY+'&language=tr'}`)
    .then(res=>{ return res.data })
}

export const getAxiosMovieCredits =(id:string)=>{
    return axios.get(`${DETAIL_MOVIE_URL+id+'/credits?'+API_KEY+'&language=tr'}`)
    .then(res=>{ return res.data })
}

export const getAxiosTrendMovies = (time_window:string) =>{
    return axios.get(`${TRENDING_MOVIE + time_window + '?' + API_KEY}`)
    .then(res=>{ return res.data.results })
}

export const getAxiosVideos = (id:string) =>{
    return axios.get(`${VIDEOS+id+'/videos?'+API_KEY}`)
    .then(res =>{ return res.data.results })
} 

export const getAxiosRecommendations = (id:string) =>{
    return axios.get(`${VIDEOS+id+'/recommendations?'+API_KEY}`)
    .then(res =>{ return res.data.results })
} 

export const getAxiosList = (listOfType:string) =>{
    return axios.get(`${BASE_URL+'movie/'+listOfType+'?'+API_KEY}`)
    .then(res=> { return res.data.results})
}

export const getAxiosGenres = () =>{
    return axios.get(`${BASE_URL+'genre/movie/list?'+API_KEY+'&language=tr'}`)
    .then(res =>{ return res.data.genres })
}

export const getAxiosCategory = (genre_id:number) =>{
    return axios.get(`${DISCOVER_URL+'&include_adult=false&include_video=false&language=en-US&page=1&with_genres='+genre_id}`)
    .then(res =>{ return res.data.results })
} 

export const getAxiosFilter = (adult:boolean,video:boolean,language:string,releaseDateGte:string,releaseDateLte:string,checkeds:string) =>{
    return axios.get(`${DISCOVER_URL+'&include_adult='+adult+'&include_video='+video+'&language='+language+
    '&release_date.gte='+releaseDateGte+'&release_date.lte='+releaseDateLte+'&with_genres='+checkeds}`)
    .then(res => { return res.data.results})
} 