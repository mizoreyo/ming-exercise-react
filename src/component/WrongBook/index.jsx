import React from 'react'

import axios from '../../utils/axios'
import { API_URL } from '../../config'
import WrongQuestion from './WrongQuestion'

import './index.css'

export default function WrongBook() {

  const [wqPage, setWQPage] = React.useState({})

  React.useEffect(() => {
    axios.get(`${API_URL}/wrong/own/page`)
      .then((response) => {
        setWQPage(response.data.data)
      })
  }, [])

  return (
    <div className='wrong-book-container'>
      <ul className='wrong-list'>
        {
          wqPage.records ? wqPage.records.map((wq) => {
            return <WrongQuestion key={wq.id} wq={wq} />
          }) : ''
        }
      </ul>
    </div>
  )
}
