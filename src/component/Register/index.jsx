import React from 'react'
import { Form, Input, Button, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';

import { API_URL } from '../../config';

export default function Register() {

  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Success:', values)
    setLoading(true)
    axios.post(`${API_URL}/admin/register`, values)
      .then((response) => {
        setLoading(false)
        if (response.data.code === 500) {
          message.warn('用户已存在')
        } else if (response.data.code === 200) {
          message.success("注册成功")
          navigate('/login')
        } else {
          message.error('出现未知错误')
        }
      })
      .catch(() => {
        message.error('注册出现异常')
        setLoading(false)
      })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  };

  return (
    <div className='login-form-container'>
      <div className='login-form-header'>
        注册
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
                message: 'Please input username!',
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
                message: 'Please input password!',
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
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
