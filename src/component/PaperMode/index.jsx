import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import axios from '../../utils/axios'

import { API_URL } from '../../config'
import CreatePaper from './CreatePaper'
import Paper from './Paper'
import './index.css'

export default function PaperMode() {

  const [paper, setPaper] = React.useState({})
  const navigate = useNavigate()
  const [refresh, setRefresh] = React.useState(true)

  function forceRefresh() {
    setRefresh(!refresh)
  }

  React.useEffect(() => {
    axios.get(`${API_URL}/paper`)
      .then((response) => {
        if (response.data.data === null) {
          navigate('/paper_mode/create')
        } else {
          setPaper(response.data.data)
        }
      })
  }, [refresh])

  return (
    <div className='paper-mode-container'>
      <Routes>
        <Route path='/create' element={<CreatePaper forceRefresh={forceRefresh} />} />
        <Route path='/' element={<Paper paper={paper} />}></Route>
      </Routes>
    </div>
  )
}
