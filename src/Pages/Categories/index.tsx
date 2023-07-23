import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAxiosCategory, getAxiosGenres } from '../../Hooks'
import { Detail, GenresInterface } from '../../Types/Type'
import { IMAGE_SIZE_500, IMAGE_URL } from '../../Hooks/Urls'
import './Categories.scss'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Tooltip } from 'react-tooltip'

const Categories = () => {

    const [genres, setGenres] = useState<GenresInterface[]>([])
    const [genreName, setGenreName] = useState<string>('')
    const [categorizedMovies, setCategorizedMovies] = useState<Detail[]>([])

    const params = useParams()
    const navigate = useNavigate()

    const clickedCard = (e: Detail) => {
        navigate(`/moviedetail/${e.id}`)
    }

    useEffect(() => {
        getAxiosGenres().then(data => {
            setGenres(data)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        genres.map(e => {
            if (e.id === Number(params.id)) {
                setGenreName(e.name)
            }
        })
    }, [genres])

    useEffect(() => {
        getAxiosCategory(Number(params.id)).then(data => {
            setCategorizedMovies(data)
        }).catch(err => {
            console.log(err)
        })
    }, [params.id])

    return (
        <>
            <div className='category-page'>
                <div className="category-page-top-section">
                    <div className="category-page-top-section-left">
                        <ArrowLeftOutlined data-tooltip-id='back-tooltip'
                            data-tooltip-content="Önceki Sayfaya Dön"
                            onClick={() => { navigate(-1) }} style={{ color: 'white', fontSize: '40px', cursor: 'pointer', paddingRight: '50px' }} />
                        <Tooltip id="back-tooltip" />
                    </div>
                    <div className="category-page-top-section-right">
                        <h1>{genreName}</h1>
                    </div>
                </div>
                <div className="card-section-of-categorized-movies">
                    {categorizedMovies.map(data => {
                        return (
                            <div onClick={() => clickedCard(data)} className='card-of-categorized-movie'>
                                <img className='categorized-img' src={IMAGE_URL + IMAGE_SIZE_500 + data.poster_path} alt="poster-img" />
                                <h5 style={{ padding: '10px' }}>{data.title}</h5>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Categories