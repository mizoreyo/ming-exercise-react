import React from 'react'

import axios from '../../../utils/axios'
import { API_URL } from '../../../config'
import Question from '../../Question'

import './index.css'

export default function WrongQuestion(props) {

  const [wrongQ, setWrongQ] = React.useState({})
  const { wq } = props

  React.useEffect(() => {
    if (wq) {
      axios.get(`${API_URL}/question/${wq.questionId}`)
        .then((response) => {
          setWrongQ(response.data.data)
        })
    }
  }, [])

  return (
    <li className='wrong-child'>
      <Question question={wrongQ} hiddenSubmit />
      <div className='wrong-info'>
        正确答案: <span>{wrongQ.answer}</span>&nbsp;&nbsp;
        您的答案: <span>{wq.wrongAnswer}</span>&nbsp;&nbsp;
      </div>
    </li>
  )
}
