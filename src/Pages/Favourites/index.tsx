import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Detail } from "../../Types/Type";
import { getAllFavourites } from "../../Firebase/Firebase";
import MovieList from "../../Components/MovieList";
import { useNavigate } from "react-router-dom";
import { IMAGE_SIZE_500, IMAGE_URL } from "../../Hooks/Urls";

interface IFavouriteData {
  id: string;
  userId: string;
  movie: Detail;
}

const Favourites: React.FC = () => {
  const context = useAuth();
  const favouriteMovies: Detail[] = [];

//   const [favouriteMovies,setFavouriteMovies] = useState<Detail[]>([])

  const navigate = useNavigate()

  const clickedCard =(e:Detail)=>{
      navigate(`/moviedetail/${e.id}`)        
  }

  const getFavouriteMovies = async (id: string) => {
    try {
      const favourites = await getAllFavourites(id);
      favourites.map((m: IFavouriteData) => {
        favouriteMovies.push(m.movie);
        // setFavouriteMovies({...favouriteMovies,m.movie})
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
        getFavouriteMovies(context.user.uid);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  

  return (
    <div>
      <MovieList data={favouriteMovies} baslik={"FAVORİLERİM"} />
    </div>
  );
};

export default Favourites;
