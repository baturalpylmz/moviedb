import React, { useEffect, useState } from 'react'
import { getAxiosTrendMovies } from '../../Hooks'
import { Detail } from '../../Types/Type'
import { IMAGE_SIZE_500, IMAGE_URL } from '../../Hooks/Urls'
import './TrendMovies.scss'
import { useNavigate } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons'
import NoPosterImg from '../../Images/no-poster-image/no-poster.jpg'
import { Button } from 'antd'

interface Props{
    time_window:string
}

const TrendMovies:React.FC<Props> = ({time_window}) => {

    const navigate = useNavigate()
    const [trends, setTrends] = useState<Detail[]>([])

    const [newTrends,setNewTrends] = useState<Detail[]>([])


    const clickedCard =(e:Detail)=>{
        navigate(`/moviedetail/${e.id}`)        
    }

    useEffect(() => {
        getAxiosTrendMovies(time_window).then(res=>{
            setTrends(res);
            setNewTrends([res[0],res[1],res[2],res[3],res[4]])
        }).catch(error=>{
            console.log(error,'BEŞ');
        });
    }, [time_window])
    

  return (
    <div className='trends-section'>
        <div className='top-section'>
            <h1 style={{color:'white'}}>{`${time_window==='day' ? 'GÜNÜN TREND FİLMLERİ' : 'HAFTANIN TREND FİLMLERİ'}`}</h1>   
            <Button onClick={()=>navigate(`/trends/${time_window}`)} className='show-all-btn'>{<PlusOutlined />}Tümünü Göster</Button>  
        </div> 
        <div className='cards-section'> 
        {

            newTrends.map(e=>{
                return( 
                    <div key={e.id} className='card' onClick={()=>clickedCard(e)}> 
                        <img className='poster-img' src={e.poster_path ? IMAGE_URL + IMAGE_SIZE_500 + e.poster_path : NoPosterImg} alt='poster-img'/>
                        <h3 className='movie-title'>{e.original_title}</h3>
                    </div>
                )})
            }
        </div>
        <hr style={{width:'85%'}} />
    </div>
  )
}

export default TrendMovies