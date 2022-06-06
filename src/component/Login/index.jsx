import React from 'react'
import { Form, Input, Button, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';

import { API_URL } from '../../config';
import tokenUtils from '../../utils/token-utils';

import './index.css'


export default function Login() {

  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Success:', values)
    setLoading(true)
    axios.post(`${API_URL}/admin/login`, values)
      .then((response) => {
        setLoading(false)
        let tokenHead = response.data.data.tokenHead
        let token = response.data.data.token
        tokenUtils.setToken(`${tokenHead} ${token}`);
        console.log('登录成功')
        navigate('/')
      })
      .catch(() => {
        console.log('登录出现异常')
        message.error('登录出现异常')
        setLoading(false)
      })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  };

  return (
    <div className='login-form-container'>
      <div className='login-form-header'>
        明题库
      </div>
      <div className='login-form'>
        <Form
          layout='vertical'
          name="login"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
        <Link style={{ display: 'block', width: '100%', textAlign: 'center' }} to={'/register'}>注册</Link>
      </div>
    </div>
  );
}
