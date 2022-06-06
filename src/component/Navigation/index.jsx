import React from 'react'
import { Avatar } from 'antd';
import { Menu, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Layout } from 'antd'
import { useNavigate } from 'react-router-dom'

import tokenUtils from '../../utils/token-utils';

import './index.css'

const { Header } = Layout
const items = [
  {
    label: '首页',
    key: '/',
  },
  {
    label: '随机一题',
    key: '/rand',
  },
  {
    label: '试卷测试',
    key: '/paper_mode',
  },
  {
    label: '试卷记录',
    key: '/paper_record',
  },
  {
    label: '错题本',
    key: '/wrong_book',
  }
]

export default function Navigation() {
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false)

  function nav(item) {
    console.log(item);
    navigate(item.key)
  }

  function logout() {
    console.log("登出。。。")
    tokenUtils.setToken("");
    navigate("/login")
  }

  return (
    <Header className='nav-container'>
      <img className='logo' src="/logo.png" alt="图标" />
      <div className='nav-right'>
        <Menu onClick={nav} className='nav-tab' mode="horizontal" items={items} />
        <Avatar onClick={() => { setShow(!show) }} className='nav-avatar' size={40} icon={<UserOutlined />} />
        <div className={show ? 'user-info' : 'hidden'}>
          <div>已登录</div>
          <Button type="primary" onClick={logout}>登出</Button>
        </div>
      </div>
    </Header>
  )
}
