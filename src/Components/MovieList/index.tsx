import React from 'react'
import { Detail } from '../../Types/Type'
import { useNavigate } from 'react-router-dom'
import { IMAGE_SIZE_500, IMAGE_URL } from '../../Hooks/Urls'
import NoPosterImg from '../../Images/no-poster-image/no-poster.jpg'
import './MovieList.scss'

interface Props {
    data: Detail[],
    baslik: string
}

const MovieList: React.FC<Props> = ({ data, baslik }) => {

    const navigate = useNavigate()

    const clickedCard =(e:Detail)=>{
        navigate(`/moviedetail/${e.id}`)        
    }

    return (
        <div>
            <div className='movies-section'>
                <h1 style={{ color: 'white' }}>{baslik}</h1>

                <div className='cards-section'>
                    {

                        data.map(e => {
                            return (
                                <div key={e.id} className='card' onClick={() => clickedCard(e)}>
                                    <img className='poster-img' src={e.poster_path ? IMAGE_URL + IMAGE_SIZE_500 + e.poster_path : NoPosterImg} alt='poster-img' />
                                    <h3 style={{ color: 'white', fontSize: '15px' }}>{e.original_title}</h3>
                                </div>
                            )
                        })
                    }
                </div>
                <hr style={{ width: '85%' }} />
            </div>
        </div>
    )
}

export default MovieList