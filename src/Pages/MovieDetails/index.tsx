import React, { useContext, useEffect, useState } from 'react'
import { Router, useNavigate, useParams } from 'react-router-dom'
import { getAxiosMovieDetails, getAxiosMovieCredits, getAxiosVideos, getAxiosRecommendations } from '../../Hooks'
import { Detail, Credits, Videos } from '../../Types/Type';
import { IMAGE_SIZE_500, IMAGE_SIZE_1920, IMAGE_URL } from '../../Hooks/Urls';
import Icon, { HomeOutlined, ArrowLeftOutlined, LikeOutlined, DollarOutlined, WarningOutlined, SafetyOutlined, VideoCameraOutlined, PlusOutlined } from '@ant-design/icons';
import './MovieDetail.scss'
import Cards from './Cards';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import VideoSection from './VideoSection';
import Divs from '../../Components/Divs';
import NoPosterImg from '../../Images/no-poster-image/no-poster.jpg'
import { Button, FloatButton } from 'antd';
import { Tooltip } from 'react-tooltip'
import { addFavourite, getSelectedFavourite, removeFavourite} from '../../Firebase/Firebase';
import { useAuth } from '../../Context/AuthContext';

const HeartSvg = () => (
    <svg width="2em" height="2em" fill="currentColor" viewBox="0 0 1024 1024">
        <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
    </svg>
);

interface FavouritesProps{
    favouriteMovieId:number,
    id:string
}

const HeartIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={HeartSvg} {...props} />
);

const MovieDetails: React.FC = () => {
    const context = useAuth()

    const navigate = useNavigate()
    const params = useParams()
    const [details, setDetails] = useState<Detail>()
    const [credits, setCredits] = useState<Credits>()
    const [isClicked, setIsClicked] = useState<Boolean>(false)
    const [videos, setVideos] = useState<Videos[]>([])
    
    const [newRecommendations, setNewRecommendations] = useState<Detail[]>([])
    const clickOnFav = () => {
        if(!context.user)
                return navigate("/login")
                setIsClicked(!isClicked)  
    } 

    const addOrDeleteFavourite =async()=>{
        if(!isClicked){
            if(context.user)
                await addFavourite(details,context.user.uid)            
        }
        else{            
            const favouriteMovieIds = await getSelectedFavourite(details?.id ? details.id : 0)
            removeFavourite(favouriteMovieIds)           
        }
    }

    const sendGenreId = (id: number) => {
        navigate(`/category/${id}`)
    }

    const myStyledBackground = {
        backgroundImage: `url(${IMAGE_URL + IMAGE_SIZE_1920 + details?.backdrop_path})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        filter: 'blur(2px)'
    }

    useEffect(() => {
        if (params.id !== undefined) {

            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            getAxiosMovieDetails(params.id).then(data => {
                setDetails(data)
            }).catch(error => {
                console.error(error, 'BİR');
            });

            getAxiosMovieCredits(params.id).then(data => {
                setCredits(data)
            }).catch(error => {
                console.error(error, 'İKİ');
            });

            getAxiosVideos(params.id).then(data => {
                setVideos(data)
            }).catch(error => {
                console.log(error, 'ÜÇ');
            })

            getAxiosRecommendations(params.id).then(data => {
                let existedData:Detail[]=[]
                if (data.length !== 0){
                    
                    data.map((el:Detail,index:number)=>{
                        if(index<5){
                            existedData.push(el)
                        }
                    })
                    setNewRecommendations(existedData)
                }
                else
                    setNewRecommendations(data)
                }).catch(error => {
                console.log(error, 'DÖRT');
            })
        }
    }, [params.id])

    const timeFormatter = (mins: number) => {
        let minute = mins
        let hour = Math.floor(minute / 60)
        minute = minute - hour * 60
        return hour + 'sa ' + minute + 'dk'
    }


    return (

        <div className='movie-detail-page'>
            <div className='info-section'>
                <div className='yazi-section'>
                    <div>
                        <ArrowLeftOutlined data-tooltip-id='back-tooltip'
                            data-tooltip-content="Önceki Sayfaya Dön"
                            onClick={() => { navigate(-1) }} style={{ color: 'white', fontSize: '40px', cursor: 'pointer', paddingRight: '50px' }} />
                        <Tooltip id="back-tooltip" />
                        <HomeOutlined data-tooltip-id='home-tooltip'
                            data-tooltip-content="Anasayfaya Dön"
                            onClick={() => { navigate('/') }} style={{ color: 'white', fontSize: '40px', cursor: 'pointer' }} />
                        <Tooltip id="home-tooltip" />
                    </div>
                    <h1 className='yazi'>{details?.original_title && details.original_title + ' (' + details.release_date.split('-')[0] + ')'}</h1>
                    <div onClick={clickOnFav}>
                        {
                            <div onClick={()=>addOrDeleteFavourite()}>
                                <HeartIcon
                                    data-tooltip-id='fav-tooltip'
                                    data-tooltip-content="Favorilere Ekle"
                                    style={{ color: isClicked ? 'red' : 'white', opacity: isClicked ? '' : '0.6', cursor: 'pointer', userSelect: 'none' }} />
                                <Tooltip id='fav-tooltip' />
                            </div>
                        }
                    </div>
                </div>

                <div className='back-image-section' style={myStyledBackground}></div>
                <div className='img-section'>
                    <img alt='movie-img' src={`${details?.poster_path ? IMAGE_URL + IMAGE_SIZE_500 + details?.poster_path : NoPosterImg}`}
                        className={`${details?.poster_path ? 'movie-img' : 'no-movie-img'}`} />
                </div>

                <div className="image-bottom-section">
                    <div className="tags-section">
                        {
                            details?.genres.map(e => {
                                return (
                                    <h4 onClick={() => sendGenreId(e.id)} className='tag' style={{ color: 'white' }}>{e.name}</h4>
                                )
                            })
                        }
                    </div>
                    <div className='time-section'>
                        <p style={{ color: 'white' }}>
                            {details?.runtime && timeFormatter(details.runtime) }
                        </p>
                    </div>
                </div>



                <div className='tagline-section'>
                    <i className='tagline'>{details?.tagline}</i>
                </div>

                <div className="headline">
                    <h4 style={{ color: 'white' }}>ÖZET</h4>
                </div>

                <div className="overview-section">
                    <i className='overview'>{details?.overview}</i>
                </div>


                <div className="site-statistic-demo-card">
                    <Cards baslik={"Beğenilme Oranı"} icon={<LikeOutlined />} yazi={details?.vote_average && details.vote_average * 10} suffix={'%'} />
                    <Cards baslik={"Bütçe"} icon={<DollarOutlined />} yazi={details?.budget && details.budget} suffix={''} />
                    <Cards baslik={"18+"} icon={details?.adult ? <WarningOutlined /> : <SafetyOutlined />} yazi={details?.adult ? "Evet" : "Hayır"} suffix={''} />
                    {
                        credits?.crew.filter(x => x.job === "Director").map(filteredName => {
                            return <Cards key={filteredName.credit_id} baslik={"Yönetmen"} icon={<VideoCameraOutlined />} yazi={filteredName.name} suffix={''} />
                        })
                    }
                </div>

                <h2 className='baslik-video'>FRAGMAN</h2>
                <div className='videos-section'>
                    {
                        videos.filter(e => e.type === "Trailer").map(x => {
                            return <VideoSection data={x} key={x.id} />
                        })
                        // videos.map(e=>{
                        //    return <VideoSection data={e} key={e.id}/>
                        // })
                    }
                </div>
                <hr style={{ width: '85%', marginTop: '50px' }} />

                <div className='actors-section'>
                    <h2 className='baslik-video'>OYUNCULAR</h2>
                    <div className="actors">
                        {
                            credits?.cast.map(e => {
                                return (
                                    <div className='actor-div'>
                                        <img className='actors-img' src={e.profile_path ? IMAGE_URL + IMAGE_SIZE_500 + e.profile_path : NoPosterImg} />
                                        <h3 style={{ color: 'white' }}>{e.name}</h3>
                                        <h5 style={{ color: 'white' }}>{e.character}</h5>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>




                {
                    newRecommendations.length !== 0 && (
                        <>
                            <div className="ust-bolum">
                                <h1 style={{ color: 'white' }}>ÖNERİLENLER</h1>
                                <Button onClick={() => navigate(`/recommendations/${params.id}`)} className='btn-show-all'>
                                    <PlusOutlined />Tümünü Göster
                                </Button>
                            </div>
                            <div className="recommendations-section">
                                {
                                    newRecommendations.map(e => {
                                        return <Divs data={e} key={e.id} />;
                                    })
                                }
                            </div>
                        </>
                    )
                }
                <FloatButton.BackTop style={{backgroundColor:'red'}} />
            </div>
        </div>

    )
}

export default MovieDetails