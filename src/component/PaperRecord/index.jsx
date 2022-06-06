import React from 'react'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'

import axios from '../../utils/axios'
import { API_URL } from '../../config'
import PaperComplete from './PaperComplete'

import './index.css'

export default function PaperRecord() {

  const [paperPage, setPaperPage] = React.useState({})

  const navigate = useNavigate()
  const id = useParams()
  console.log(id);

  React.useEffect(() => {
    axios.get(`${API_URL}/paper/uncomp/page`)
      .then((response) => {
        console.log(response);
        setPaperPage(response.data.data)
      })
  }, [])

  function handleClick(id) {
    navigate(`/paper_record/${id}`)
  }

  return (
    <div className='paper-record-container'>
      <Routes>
        <Route path='/' element={<ul className='paper-record-list'>
          {
            paperPage.records ? paperPage.records.map((paper) => {
              return (
                <li className='paper-record-child' key={paper.id} onClick={() => { handleClick(paper.id) }}>
                  <div className='record-paper-info'>
                    <div className='record-paper-title'>{paper.name}</div>
                    <div className='record-paper-subject'>{paper.subjectName}</div>
                  </div>
                  <div className='record-paper-score'>{paper.userScore}</div>
                </li>
              )
            }) : ''
          }
        </ul>} />
        <Route path='/:id' element={<PaperComplete />} />
      </Routes>
    </div>
  )
}
