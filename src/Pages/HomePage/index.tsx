import React , { useEffect, useState } from 'react';
import SearchBar from '../../Components/SearchBar'
import { searchAxiosMovie } from '../../Hooks';
import { Liste } from '../../Types/Type';
import TrendMovies from '../../Components/TrendMovies';

const HomePage: React.FC =()=> {

  const [inputValue, setInputValue] = useState<string>('')
  const [searchedList, setSearchedList] = useState<Liste[]>([])

  useEffect(() => {
    searchAxiosMovie(inputValue).then(data => {
      setSearchedList(data);
    }).catch(error => {
      console.error(error);
    }); 
  }, [inputValue])

  return (
    <div>
        <SearchBar setInputValue={setInputValue} searchedList={searchedList}/>
        <TrendMovies time_window={"day"} />
        <TrendMovies time_window={"week"} />
    </div>
  )
}

export default HomePage