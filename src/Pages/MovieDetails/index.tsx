import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAxiosMovieDetails, getAxiosMovieCredits, getAxiosVideos, getAxiosRecommendations } from '../../Hooks'
import { Detail, Credits, Videos } from '../../Types/Type';
import { IMAGE_SIZE, IMAGE_URL } from '../../Hooks/Urls';
import Icon, { LikeOutlined, DollarOutlined, WarningOutlined, SafetyOutlined, VideoCameraOutlined } from '@ant-design/icons';
import './MovieDetail.scss'
import Cards from './Cards';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import VideoSection from './VideoSection';
import Divs from '../../Components/Divs';

const HeartSvg = () => (
    <svg width="2em" height="2em" fill="currentColor" viewBox="0 0 1024 1024">
        <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
    </svg>
);

const HeartIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={HeartSvg} {...props} />
);

const MovieDetails: React.FC = () => {
    const params = useParams()
    const [details, setDetails] = useState<Detail>()
    const [credits, setCredits] = useState<Credits>()
    const [isClicked, setIsClicked] = useState<Boolean>(false)
    const [videos,setVideos] = useState<Videos[]>([])
    const [recommendations,setRecommendations] = useState<Detail[]>([])

    const clickOnFav = () => {
        setIsClicked(!isClicked)
        if (isClicked) {
            //add fav axiosu çalıştır
        }
    }

    const myStyledBackground = {
        backgroundImage: `url(${IMAGE_URL + IMAGE_SIZE + details?.backdrop_path})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        filter: 'blur(2px)'
    }

    useEffect(() => {
        if (params.id !== undefined) {
            getAxiosMovieDetails(params.id).then(data => {
                setDetails(data)
            }).catch(error => {
                console.error(error);
            });

            getAxiosMovieCredits(params.id).then(data => {
                setCredits(data)
            }).catch(error => {
                console.error(error);
            });

            getAxiosVideos(params.id).then(data =>{
                setVideos(data)
            }).catch(error=> {
                console.log(error);
            })

            getAxiosRecommendations(params.id).then(data =>{
                setRecommendations(data)
            }).catch(error=>{
                console.log(error);
            })

        }
    }, [params.id])


    return (
        <div className='movie-detail-page'>
            <div className='info-section'>
                <div className='yazi-section'>
                    <h1 className='yazi'>{details?.original_title && details.original_title}</h1>
                    <div onClick={clickOnFav}>
                        {
                            <HeartIcon style={{ color: isClicked ? 'red' : 'white', opacity: isClicked ? '' : '0.6', cursor: 'pointer' }} />
                        }
                    </div>
                </div>

                <div className='back-image-section' style={myStyledBackground}></div>
                <div className='img-section'>
                    <img alt='movie-img' src={`${details?.poster_path !== undefined ? IMAGE_URL + IMAGE_SIZE + details?.poster_path : ''}`}
                        className='movie-img' />
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

                <h2 className='baslik-video'>TRAILERS</h2>
                <div className='videos-section'>
                    {
                        videos.filter(e=>e.type==="Trailer").map(x=>{
                            return <VideoSection data={x} key={x.id} />
                        })
                        // videos.map(e=>{
                        //    return <VideoSection data={e} key={e.id}/>
                        // })
                    }
                </div>

                <h2 className="baslik-recommendations">RECOMMENDATIONS</h2>
                <div className="recommendations-section">
                    {
                        recommendations.map(e=>{
                            return <Divs data={e} key={e.id}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default MovieDetails