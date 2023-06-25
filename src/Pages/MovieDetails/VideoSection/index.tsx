import React from 'react'
import { Videos } from '../../../Types/Type'
import './VideoSection.scss'


export interface VideoInterface{
  data:Videos
}

const VideoSection:React.FC<VideoInterface> = ({data}) => {
  return (
        <iframe
          title='deneme'
          className='video-section'
          src={"https://www.youtube.com/embed/"+data.key}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;" 
          allowFullScreen={true}>
        </iframe>
  )
}

export default VideoSection