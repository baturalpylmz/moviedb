import React from 'react'
import './Divs.scss'
import { Detail } from '../../Types/Type'
import { useNavigate } from 'react-router-dom'
import { IMAGE_SIZE_500, IMAGE_URL } from '../../Hooks/Urls'
import NoPosterImg from '../../Images/no-poster-image/no-poster.jpg'

interface Props{
    data:Detail
}

const Divs: React.FC<Props> = ({data}) => {
    const navigate = useNavigate()

    const clickedCard =(e:Detail)=>{
        navigate(`/moviedetail/${e.id}`) 
    }

    return (
        <div key={data.id} className='card' onClick={() => clickedCard(data)}>
            <img className='poster-img' src={data.poster_path ? IMAGE_URL + IMAGE_SIZE_500 + data.poster_path : NoPosterImg} alt='poster-img' />
            <h3 style={{ color: 'white', fontSize: '15px' }}>{data.original_title}</h3>
        </div>
    )
}

export default Divs