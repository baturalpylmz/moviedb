import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getAxiosTrendMovies } from '../../Hooks';
import { Detail } from '../../Types/Type';
import { IMAGE_SIZE_500, IMAGE_URL } from '../../Hooks/Urls';
import NoPosterImg from '../../Images/no-poster-image/no-poster.jpg'
import MovieList from '../../Components/MovieList';

const Trends: React.FC = () => {

    const params = useParams()
    const navigate = useNavigate()
    const [trends, setTrends] = useState<Detail[]>([])

    const [gelenTime, setGelenTime] = useState<any>('')

    const clickedCard =(e:Detail)=>{
        navigate(`/moviedetail/${e.id}`)        
    }

    useEffect(() => {
        setGelenTime(params.time)
        getAxiosTrendMovies(gelenTime).then(res => {
            setTrends(res);
        }).catch(error => {
            console.log(error,'ALTI');
        });
    }, [gelenTime])
    
    return (
        <div>
            <MovieList data={trends} baslik={`${gelenTime==='day' ? 'GÜNÜN TREND FİLMLERİ' : 'HAFTANIN TREND FİLMLERİ'}`}/>
            {/* <div className='trends-section'>
                <h1 style={{ color: 'white' }}>{`${gelenTime==='day' ? 'GÜNÜN TREND FİLMLERİ' : 'HAFTANIN TREND FİLMLERİ'}`}</h1>

                <div className='cards-section'>
                    {

                        trends.map(e => {
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
            </div> */}
        </div>
    )
}

export default Trends