import React from 'react';
import { Button, Form, Input, message } from 'antd';
import './SignUpPage.scss'
import { Link } from 'react-router-dom';
import { register } from '../../Firebase/Firebase';

const onFinish = async (values: any) => {
  if (values.password === values.password2) {
    try {
      const user = await register(values.email, values.password)
      console.log(user)
      message.success("Hesabınız başarılı bir şekilde oluşturuldu")
    } catch (error: any) {
      message.error(error.message)
    }
  }
  else
    message.error("Şifreler birbiri ile eşleşmiyor!")
};

const onFinishFailed = (errorInfo: any) => {
  if (errorInfo.values.email === "" || errorInfo.values.password === "")
    message.error("Boş alan bırakılamaz! Tekrar deneyiniz")
  else {
    message.error(errorInfo.errorFields[0].errors)
  }
};

const SignUpPage: React.FC = () => (
  <div className='sign-up-page'>
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

      <Form.Item
        label="Şifre Tekrar"
        name="password2"
        rules={[{ required: true, message: 'Boş geçilemez' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button className='sign-up-btn' type="primary" htmlType="submit">
          Kayıt Ol
        </Button>
      </Form.Item>
    </Form>
    <p>Zaten hesabım var <Link to={"/login"}>Giriş Yap</Link></p>
  </div>
);

export default SignUpPage