import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Detail, IFavouriteData } from "../../Types/Type";
import { getAllFavourites } from "../../Firebase/Firebase";
import MovieList from "../../Components/MovieList";
import LoadingComponent from "../../Components/LoadingComponent";
import './Favourites.scss'
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Favourites: React.FC = () => {
  const context = useAuth();
  const navigate = useNavigate() 
  const [favouriteMovies, setFavouriteMovies] = useState<Detail[]>([]);
  const [isLoading,setIsLoading]=useState<boolean>(true)

  const getFavouriteMovies = async (id: string) => {
    try {
      const favourites = await getAllFavourites(id)
      const movies = favourites.map((m: IFavouriteData) => m.movie);
      setFavouriteMovies(movies);
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if(context.user)
      getFavouriteMovies(context.user.uid);
    if(localStorage.getItem("userData")==null){
      message.error("Favorilerim sayfasına giriş yapabilmek için önce giriş yapmalısınız")
      navigate("/login")
    }
  }, [context,localStorage.getItem("userData")]);


  
  return (
    <div className="favourites-page">
      {
        isLoading ? <LoadingComponent/> : <MovieList data={favouriteMovies} baslik={"FAVORİLERİM"} />
      }
      {/* { isLoading ? <LoadingComponent/> : <MovieList data={favouriteMovies} baslik={"FAVORİLERİM"} /> } */}
    </div>
  );
};

export default Favourites;
