import React from 'react'
import { useNavigate } from 'react-router-dom'

import './index.css'

export default function SelectCard(props) {

  const navigate = useNavigate()

  function handleNavigate() {
    navigate(props.path)
  }

  return (
    <div className='select-card-container' onClick={handleNavigate}>
      <h1>{props.cardName}</h1>
    </div>
  )
}
