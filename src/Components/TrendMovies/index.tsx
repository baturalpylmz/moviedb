import React, { useState } from 'react'
import { getAxiosTrendMovies } from '../../Hooks'
import { Detail } from '../../Types/Type'
import { IMAGE_SIZE, IMAGE_URL } from '../../Hooks/Urls'
import './TrendMovies.scss'
import { useNavigate } from 'react-router-dom'

interface Props{
    time_window:string
}

const TrendMovies:React.FC<Props> = ({time_window}) => {

    const navigate = useNavigate()
    const [trends, setTrends] = useState<Detail[]>([])

    const clickedCard =(e:Detail)=>{
        navigate(`/moviedetail/${e.id}`)        
    }

    getAxiosTrendMovies(time_window).then(res=>{
        setTrends(res);
    }).catch(error=>{
        console.log(error);
    });

  return (
    <div className='trends-section'>
        <h1 style={{color:'white'}}>{`${'TREND MOVIES OF THE '+ time_window.toUpperCase()}`}</h1>   
        <div className='cards-section'> 
        {
            trends.map(e=>{
            return( 
                <div key={e.id} className='card' onClick={()=>clickedCard(e)}> 
                    <img className='poster-img' src={e.poster_path !== undefined ? IMAGE_URL + IMAGE_SIZE + e.poster_path : ''} alt='poster-img'/>
                    <h3 style={{color:'white',fontSize:'15px'}}>{e.original_title}</h3>
                </div>
            )})
        }
        </div>   
    </div>
  )
}

export default TrendMovies