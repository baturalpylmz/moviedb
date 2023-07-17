import React, { useContext, useEffect, useState } from 'react';
import SearchBar from '../../Components/SearchBar'
import { getAxiosFilter, getAxiosGenres, searchAxiosMovie } from '../../Hooks';
import { GenresInterface, Liste } from '../../Types/Type';
import TrendMovies from '../../Components/TrendMovies';
import Navbar from '../../Components/Navbar';
import { FilterOutlined } from '@ant-design/icons';
import './HomePage.scss'
import ModalComponent from '../../Components/ModalComponent';
import { Context } from '../../Context/GlobalContext';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {

  const [inputValue, setInputValue] = useState<string>('')
  const [searchedList, setSearchedList] = useState<Liste[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [genres, setGenres] = useState<GenresInterface[]>([])
  const [isAdult, setIsAdult] = useState<boolean>(false)
  const [video, setVideo] = useState<boolean>(true)
  const [releaseDateGte, setReleaseDateGte] = useState<string>('')
  const [releaseDateLte, setReleaseDateLte] = useState<string>('')
  const [checkeds, setCheckeds] = useState<string[]>([])
  const navigate= useNavigate()

  const {setFilteredData}  = useContext(Context)
  const {user}  = useAuth()

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    let path:string=`&include_adult=${isAdult}&include_video=${video}`
    if(releaseDateGte)
      path += `&release_date.gte=${releaseDateGte}` 
    if(releaseDateLte)
      path += `&release_date.lte=${releaseDateLte}`
    if(checkeds)
      path += `&with_genres=${checkeds.join(',')}`

    getAxiosFilter(path).then(data => {
      setFilteredData(data)
       navigate('/filtered')
    }).catch(err => {
      console.log(err)
    })
  };


  const handleCancel = () => {
    setIsModalOpen(false);
  };
  

  useEffect(() => {
    getAxiosGenres().then(data => {
      setGenres(data)
    }).catch(err => {
      console.log(err)
    })
  }, [])


  useEffect(() => {
    const timer:NodeJS.Timeout = setTimeout(() => {
      searchAxiosMovie(inputValue).then(data => {
        setSearchedList(data);
      }).catch(error => {
        console.error(error);
      });
    }, 1000);
    return ()=>clearTimeout(timer)
  }, [inputValue])

  return (
    <div>
      <Navbar user={user}/>
      <div className="searchBarSection">
        <SearchBar setInputValue={setInputValue} searchedList={searchedList} />
        <FilterOutlined className='filterButton' onClick={() => showModal()} />
      </div>
      <>
        <ModalComponent
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          setGenres={setGenres}
          genres={genres}
          isAdult={isAdult}
          setIsAdult={setIsAdult}
          video={video}
          setVideo={setVideo}
          releaseDateGte={releaseDateGte}
          setReleaseDateGte={setReleaseDateGte}
          releaseDateLte={releaseDateLte}
          setReleaseDateLte={setReleaseDateLte}
          checkeds={checkeds}
          setCheckeds={setCheckeds} />
      </>
      <TrendMovies time_window={"day"} />
      <TrendMovies time_window={"week"} />
    </div>
  )
}

export default HomePage