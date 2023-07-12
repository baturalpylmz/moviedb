import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Detail } from '../../Types/Type'
import { getAxiosRecommendations } from '../../Hooks'
import { IMAGE_SIZE_500, IMAGE_URL } from '../../Hooks/Urls'
import './Recommendations.scss'
import NoPosterImg from '../../Images/no-poster-image/no-poster.jpg'


const Recommendations: React.FC = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [gelenId, setGelenId] = useState<any>(params.id)
    const [recommendations, setRecommendations] = useState<Detail[]>([])

    const clickedCard = (e: Detail) => {
        navigate(`/moviedetail/${e.id}`)
    }

    useEffect(() => {
        getAxiosRecommendations(gelenId).then(res => {
            setRecommendations(res);
        }).catch(error => {
            console.log(error);
        });
    }, [gelenId])

    return (
        <div>
            <div className='rec-section'>
                <h1 style={{ color: 'white' }}>ALL RECOMMENDATIONS</h1>
                <div className='cards-section'>
                    {

                        recommendations.map(e => {
                            return (
                                <div key={e.id} className='card' onClick={() => clickedCard(e)}>
                                    <img className='poster-img' src={e.poster_path ? IMAGE_URL + IMAGE_SIZE_500 + e.poster_path : NoPosterImg } alt='poster-img' />
                                    <h3 style={{ color: 'white', fontSize: '15px' }}>{e.original_title}</h3>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Recommendations