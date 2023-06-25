export interface Liste{
    title:string,
    id:number,
    poster_path:string
} 

export interface Detail{
    adult:boolean,
    backdrop_path:string,
    budget:number,
    id:number,
    imdb_id:string,
    original_language:string,
    original_title:string,
    overview:string,
    popularity:number,
    poster_path:string,
    status:string,
    tagline:string,
    title:string,
    vote_average:number
  }

export interface cast{
    adult:boolean,
    cast_id:number,
    character:string,
    credit_id:string,
    gender:number,
    id:number,
    known_for_department:string,
    name:string,
    order:number,
    original_name:string,
    popularity:number,
    profile_path:string
}

export interface crew{
    adult:boolean,
    credit_id:string,
    department:string,
    gender:number,
    id:number,
    job:string,
    known_for_department:string,
    name:string,
    original_name:string,
    popularity:number,
    profile_path:string
}

export interface Credits {
    id:number,
    cast: cast[],
    crew: crew[]
}

export interface Videos{
    id:string,
    iso_639_1:string,
    iso_3166_1:string,
    key:string,
    name:string,
    official:boolean,
    published_at:string,
    site:string,
    size:number,
    type:string
}