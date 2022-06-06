import React from 'react'
import { Layout } from 'antd'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

import Index from './component/Index';
import Navigation from './component/Navigation'
import Login from './component/Login'
import Rand from './component/Rand'
import PaperMode from './component/PaperMode'
import PaperRecord from './component/PaperRecord'
import WrongBook from './component/WrongBook';
import Register from './component/Register';
import tokenUtils from './utils/token-utils';

import './App.css'

const { Content, Footer } = Layout;

function App() {

  const navigate = useNavigate()
  const location = useLocation()

  React.useEffect(() => {
    const token = tokenUtils.getToken()
    if (token === null || token === '') {
      console.log('token不存在,请登录')
      navigate('/login')
    } else {
      console.log('token存在: ' + token);
      navigate(location.pathname)
    }
  }, [])

  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={
          <Layout >
            <Navigation />
            <Content style={{ padding: '3rem' }}>
              <Index />
            </Content>
            <Footer style={{ textAlign: 'center', backgroundColor: '#fff' }}>
              Ming Exercise ©2018 Created by Mizore
            </Footer>
          </Layout>
        } />
        <Route path='/rand' element={
          <Layout >
            <Navigation />
            <Content style={{ padding: '3rem' }}>
              <Rand />
            </Content>
            <Footer style={{ textAlign: 'center', backgroundColor: '#fff' }}>
              Ming Exercise ©2018 Created by Mizore
            </Footer>
          </Layout>
        } />
        <Route path='/paper_mode/*' element={
          <Layout >
            <Navigation />
            <Content style={{ padding: '3rem' }}>
              <PaperMode></PaperMode>
            </Content>
            <Footer style={{ textAlign: 'center', backgroundColor: '#fff' }}>
              Ming Exercise ©2022 Created by Mizore
            </Footer>
          </Layout>
        } />
        <Route path='/paper_record/*' element={
          <Layout >
            <Navigation />
            <Content style={{ padding: '3rem' }}>
              <PaperRecord></PaperRecord>
            </Content>
            <Footer style={{ textAlign: 'center', backgroundColor: '#fff' }}>
              Ming Exercise ©2022 Created by Mizore
            </Footer>
          </Layout>
        } />
        <Route path='/wrong_book' element={
          <Layout >
            <Navigation />
            <Content style={{ padding: '3rem' }}>
              <WrongBook />
            </Content>
            <Footer style={{ textAlign: 'center', backgroundColor: '#fff' }}>
              Ming Exercise ©2022 Created by Mizore
            </Footer>
          </Layout>
        } />
      </Routes>
    </div>
  );
}

export default App;
