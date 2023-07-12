import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAxiosList } from '../../Hooks'
import { Detail } from '../../Types/Type'
import { IMAGE_SIZE_1920, IMAGE_URL } from '../../Hooks/Urls'
import './List.scss'
import Navbar from '../../Components/Navbar'

const List: React.FC = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [list, setList] = useState<Detail[]>([])

  const clickedCard = (e: Detail) => {
    navigate(`/moviedetail/${e.id}`)
  }


  useEffect(() => {
    if (params.typeOfList !== undefined) {
      getAxiosList(params.typeOfList).then(data => {
        setList(data)
      }).catch(error => {
        console.log(error);
      })
    }
  }, [params])

  let headerOfPage;
  switch (params.typeOfList) {
    case 'popular':
      headerOfPage = 'Popüler Filmler'
      break
    case 'now_playing':
      headerOfPage = 'Gösterimdeki Filmler'
      break
    case 'upcoming':
      headerOfPage = 'Yakında'
      break
    case 'top_rated':
      headerOfPage = 'En Fazla Oy Alanlar'
      break
  }

  return (<>
    <Navbar />
    <div className='list-page'>
      <h1>{headerOfPage}</h1>
      <ul className="movieList">
        {
          list.map(data => {
            return (
              <li onClick={() => clickedCard(data)} key={data.id} className='movieList-item'>
                <img className='movie-item-img' src={`${IMAGE_URL + IMAGE_SIZE_1920 + data.poster_path}`} alt="movie-img" />
                <i style={{ fontSize: '17px' }}>{data.title}</i>
                <span style={{padding:'10px'}}>{`${'Beğenilme Oranı : ' + data.vote_average + '   /10'}`}</span>
              </li>
            )
          })
        }
      </ul>
    </div>
  </>
  )
}

export default List