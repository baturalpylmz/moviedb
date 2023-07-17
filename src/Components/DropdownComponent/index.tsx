import React from 'react';
import { DownOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { Button, Dropdown, MenuProps, Space, message } from 'antd';
import { logout } from '../../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import './DropdownComponent.scss'


interface Props {
  user: User | undefined
}

const items: MenuProps['items'] = [
  {
    label: 'Kullanıcı Bilgileri',
    key: '1',
    icon: <UserOutlined />,
  },
  {
    label: 'Çıkış Yap',
    key: '2',
    icon: <LogoutOutlined />,
  }
];

const DropdownComponent: React.FC<Props> = ({ user }) => {

  const navigate = useNavigate()

  const handleMenuClick: MenuProps['onClick'] = async (e) => {
    if (e.key == "2") {
      if (window.confirm("Çıkış yapmak istediğinize emin misiniz?")) {
        try {
          await logout()
          message.info("Çıkış yapıldı")
          localStorage.removeItem("userData")
          navigate("/login")
        } catch (error: any) {
          message.error(error.message)
        }
      }
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div>
      <Dropdown menu={menuProps}>
        <img className='user-icon'
          src={user?.photoURL ? user.photoURL : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} />
      </Dropdown>
    </div>
  )
}

export default DropdownComponent