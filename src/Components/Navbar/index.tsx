import React, { useEffect, useState } from 'react'
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import './Navbar.scss'
import { useNavigate } from 'react-router-dom';
import { getAxiosGenres } from '../../Hooks';
import { GenresInterface } from '../../Types/Type';

const Navbar: React.FC = () => {

  const navigate = useNavigate()
  const [genres, setGenres] = useState<GenresInterface[]>([])


  useEffect(() => {
    getAxiosGenres().then(data => {
      setGenres(data)
    }).catch(error => {
      console.log(error)
    })
  }, [])

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <p onClick={() => navigate('/list/popular')}>
        Popüler
      </p>
    ),
  },
  {
    key: '2',
    label: (
      <p onClick={() => navigate('/list/now_playing')}>
        Gösterimdekiler
      </p>
    ),
  },
  {
    key: '3',
    label: (
      <p onClick={() => navigate('/list/upcoming')}>
        Yakında
      </p>
    ),
  },
  {
    key: '4',
    label: (
      <p onClick={() => navigate('/list/top_rated')}>
        En Fazla Oy Alanlar
      </p>
    ),
  },
];

return (
  <div className='navbar-section'>
    <h1 style={{ color: 'white', userSelect: 'none' }}>MOVIE DB PROJECT</h1>
    <div className="tabs">
      <div className='tab' onClick={() => navigate('/')}>Anasayfa</div>
      <div className='tab'>
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Filmler
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
      <div className='tab'>Favorilerim</div>
    </div>


    <Button className='log-in-btn'>Giriş Yap</Button>
  </div>
);
}

export default Navbar