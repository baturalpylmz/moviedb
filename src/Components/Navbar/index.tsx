import React from 'react'
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import './Navbar.scss'
import { useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import DropdownComponent from '../DropdownComponent';

interface Props {
  user:User | undefined
}

const Navbar: React.FC<Props>= ({user}) => {

  const navigate = useNavigate()

  const goToLoginPage = () => {
    navigate("/login")
  }

  // const goToLogOut = async() =>{
  //   if (window.confirm("Çıkış yapmak istediğinize emin misiniz?")) {
  //     try {
  //       await logout()
  //       message.info("Çıkış yapıldı")
  //       navigate("/login")
  //     } catch (error:any) {
  //       message.error(error.message)
  //     }
  //   }
  // } 

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
      <h1 className='logo-baslik'>MOVIE DB PROJECT</h1>
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

      {
        user ? <DropdownComponent user={user}/>:
        <Button onClick={() => goToLoginPage()} className='log-in-btn'>Giriş Yap</Button>
      }
      {/* <Button onClick={() => goToLoginPage()} className='log-in-btn'>Çıkış Yap</Button> */}
    </div>
  );
}

export default Navbar