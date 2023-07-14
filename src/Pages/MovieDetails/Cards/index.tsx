import React, { ReactNode } from 'react'
import { Card, Statistic } from 'antd';
import styles from './Cards.module.scss'


interface Props{
    baslik:string,
    icon:ReactNode,
    yazi:number | undefined | string,
    suffix:string
}

const Cards:React.FC<Props> = ({baslik,icon,yazi,suffix}) => {
    return (
        <Card className={styles.card}>
                <Statistic
                  title={baslik}
                  value={yazi}
                  precision={2}
                  valueStyle={{ color: 'white' ,backgroundColor:'black',fontSize:'18px', fontWeight:'bold',cursor:'default'}}
                  prefix={icon}
                  suffix={suffix}
                />
        </Card>
    )
}

export default Cards