import React from 'react'
import SelectCard from './SelectCard'

import './index.css'

export default function SelectCardList() {
  return (
    <div className='card-container'>
      <SelectCard cardName='随机一题' path='/rand' />
      <SelectCard cardName='试卷测试' path='/paper_mode' />
      <SelectCard cardName='试卷记录' path='/paper_record' />
      <SelectCard cardName='错题本' path='/wrong_book' />
    </div>
  )
}
