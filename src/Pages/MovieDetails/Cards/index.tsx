import React, { ReactNode } from 'react'
import { Card, Statistic } from 'antd';
import './Cards.scss'

interface Props{
    baslik:string,
    icon:ReactNode,
    yazi:number | undefined | string,
    suffix:string
}

const Cards:React.FC<Props> = ({baslik,icon,yazi,suffix}) => {
    return (
        <Card className='card'>
                <Statistic
                  title={baslik}
                  value={yazi}
                  precision={2}
                  valueStyle={{ color: '#3f8600' ,backgroundColor:'white'}}
                  prefix={icon}
                  suffix={suffix}
                />
        </Card>
    )
}

export default Cards