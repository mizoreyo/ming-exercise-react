import React from 'react'
import { useParams } from 'react-router-dom';

import axios from '../../../utils/axios'
import { API_URL } from '../../../config'
import Paper from '../../PaperMode/Paper'

export default function PaperComplete() {

  const [paper, setPaper] = React.useState({})

  const { id } = useParams()
  React.useEffect(() => {
    axios.get(`${API_URL}/paper/${id}`)
      .then((response) => {
        console.log(response.data);
        setPaper(response.data.data)
      })
  }, [])

  return (
    <Paper paper={paper} />
  )
}
