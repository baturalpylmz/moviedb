import axios from 'axios';
import { SEARCH_URL,DETAIL_MOVIE_URL,API_KEY,TRENDING_MOVIE,VIDEOS } from './Urls';

export const searchAxiosMovie =(name:string)=>{
    return axios.get(`${SEARCH_URL+"&query="+name}`)
    .then(res=>{ return res.data.results })
}

export const getAxiosMovieDetails =(id:string)=>{
    return axios.get(`${DETAIL_MOVIE_URL+id+'?'+API_KEY}`)
    .then(res=>{ return res.data })
}

export const getAxiosMovieCredits =(id:string)=>{
    return axios.get(`${DETAIL_MOVIE_URL+id+'/credits?'+API_KEY}`)
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
