import React, { useContext } from 'react';
import { Button, Form, Input, message } from 'antd';
import './LoginPage.scss'
import logoImage from '../../Images/logo/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../Firebase/Firebase';
import { useAuth } from '../../Context/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const {setUser}  = useAuth()

  const onFinish = async (values: any) => {
    try {
      const user = await login(values.email, values.password)
      setUser(user)
      message.success("Giriş yapıldı !")
      localStorage.setItem("userData",JSON.stringify(user))
      navigate("/")
    } catch (error: any) {
      message.error(error.message)
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    if (errorInfo.values.email === "" || errorInfo.values.password === "")
      message.error("Boş alan bırakılamaz! Tekrar deneyiniz")
    else {
      message.error(errorInfo.errorFields[0].errors)
    }
  };

  return (
    <div className='login-page'>
      <img className='logo' src={logoImage} />
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="E-Posta"
          name="email"
          rules={[{ required: true, message: 'Boş geçilemez' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Şifre"
          name="password"
          rules={[{ required: true, message: 'Boş geçilemez' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button className='login-btn' type="primary" htmlType="submit">
            Giriş Yap
          </Button>
        </Form.Item>
      </Form>
      <p>Hesabınız yok mu? <Link to={'/sign-up'}>Hesap Oluşturun</Link></p>
    </div>

  )
}

export default LoginPage