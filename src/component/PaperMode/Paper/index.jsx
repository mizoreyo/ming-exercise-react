import React from 'react'
import qs from 'qs'
import { nanoid } from 'nanoid'
import { Button, message } from 'antd'

import Question from '../../Question'
import axios from '../../../utils/axios'
import { API_URL } from '../../../config'

import './index.css'

export default function Paper(props) {

  const { paper } = props
  const [selectQs, setSelectQs] = React.useState([])
  const [moreSQs, setMoreSQs] = React.useState([])
  const [fillQs, setFillQs] = React.useState([])
  const [judgeQs, setJudgeQs] = React.useState([])

  React.useEffect(() => {
    console.log(paper);
    if (paper.paperContent) {
      const { selectQuestions, moreSelectQuestions, fillQuestions, judgeQuestions } = paper.paperContent
      if (selectQuestions && moreSelectQuestions && fillQuestions && judgeQuestions) {
        getQs(selectQuestions, setSelectQs)
        getQs(moreSelectQuestions, setMoreSQs)
        getQs(fillQuestions, setFillQs)
        getQs(judgeQuestions, setJudgeQs)
      }
    }
  }, [paper])

  function setAnswer(questionType, questionNum, answer) {
    console.log('修改答案');
    if (paper.paperContent) {
      switch (questionType) {
        case 1: paper.paperContent.selectQuestions[questionNum - 1].userAnswer = answer; break;
        case 2: paper.paperContent.moreSelectQuestions[questionNum - 1].userAnswer = answer; break;
        case 3: paper.paperContent.fillQuestions[questionNum - 1].userAnswer = answer; break;
        case 4: paper.paperContent.judgeQuestions[questionNum - 1].userAnswer = answer; break;
      }
    }
  }

  function handleSubmit() {
    console.log("提交试卷");
    console.log(paper)
    try {
      checkEmptyAnswer(paper.paperContent.selectQuestions)
      checkEmptyAnswer(paper.paperContent.moreSelectQuestions)
      checkEmptyAnswer(paper.paperContent.fillQuestions)
      checkEmptyAnswer(paper.paperContent.judgeQuestions)
      axios.post(`${API_URL}/paper/scoring`, paper)
        .then((response) => {
          message.success("作答成功！您本次作答成绩为: " + response.data.data + "分")
        })
    } catch (e) {
      message.error("还有题目没有作答！请作答后再提交")
    }
  }

  function checkEmptyAnswer(qs) {
    for (let i = 0; i < qs.length; i++) {
      if (qs[i].userAnswer === null) {
        throw new Error("题目尚未回答")
      }
    }
  }

  function getQs(paperQs, callback) {
    let ids = []
    paperQs.map((paperQ) => {
      ids.push(paperQ.questionId)
    })
    axios.get(`${API_URL}/question/list`, {
      paramsSerializer: params => {
        return qs.stringify(params, { indices: false })
      },
      params: {
        ids: ids
      }
    })
      .then((response) => {
        callback(response.data.data)
      })
  }

  return (
    <div className='paper-container'>
      <h1 className='paper-title'>{paper.name ? paper.name : '试卷'}</h1>
      <h2>一、选择题</h2>
      {
        selectQs ? selectQs.map((q, index) => {
          return (
            <div key={nanoid()}>
              <Question question={q} questionNum={index + 1} hiddenSubmit setAnswer={setAnswer} />
              {paper.complete && paper.complete === 1 ? <div className='complete-q-info'>
                正确答案: <span>{paper.paperContent ? paper.paperContent.selectQuestions[index].trueAnswer : ''}</span>&nbsp;&nbsp;
                您的答案: <span>{paper.paperContent ? paper.paperContent.selectQuestions[index].userAnswer : ''}</span>&nbsp;&nbsp;
                得分: <span>{paper.paperContent ? paper.paperContent.selectQuestions[index].questionUserScore : ''}</span>
              </div> : ''}
            </div>
          )
        }) : ''
      }
      <h2>二、多选题</h2>
      {
        moreSQs ? moreSQs.map((q, index) => {
          return (
            <div key={nanoid()}>
              <Question question={q} questionNum={index + 1} hiddenSubmit setAnswer={setAnswer} />
              {paper.complete && paper.complete === 1 ? <div className='complete-q-info'>
                正确答案: <span>{paper.paperContent ? paper.paperContent.moreSelectQuestions[index].trueAnswer : ''}</span>&nbsp;&nbsp;
                您的答案: <span>{paper.paperContent ? paper.paperContent.moreSelectQuestions[index].userAnswer : ''}</span>&nbsp;&nbsp;
                得分: <span>{paper.paperContent ? paper.paperContent.moreSelectQuestions[index].questionUserScore : ''}</span>
              </div> : ''}
            </div>
          )
        }) : ''
      }
      <h2>三、填空题</h2>
      {
        fillQs ? fillQs.map((q, index) => {
          return (
            <div key={nanoid()}>
              <Question question={q} questionNum={index + 1} hiddenSubmit setAnswer={setAnswer} />
              {paper.complete && paper.complete === 1 ? <div className='complete-q-info'>
                正确答案: <span>{paper.paperContent ? paper.paperContent.fillQuestions[index].trueAnswer : ''}</span>&nbsp;&nbsp;
                您的答案: <span>{paper.paperContent ? paper.paperContent.fillQuestions[index].userAnswer : ''}</span>&nbsp;&nbsp;
                得分: <span>{paper.paperContent ? paper.paperContent.fillQuestions[index].questionUserScore : ''}</span>
              </div> : ''}
            </div>
          )
        }) : ''
      }
      <h2>四、判断题</h2>
      {
        judgeQs ? judgeQs.map((q, index) => {
          return (
            <div key={nanoid()}>
              <Question question={q} questionNum={index + 1} hiddenSubmit setAnswer={setAnswer} />
              {paper.complete && paper.complete === 1 ? <div className='complete-q-info'>
                正确答案: <span>{paper.paperContent ? paper.paperContent.judgeQuestions[index].trueAnswer : ''}</span>&nbsp;&nbsp;
                您的答案: <span>{paper.paperContent ? paper.paperContent.judgeQuestions[index].userAnswer : ''}</span>&nbsp;&nbsp;
                得分: <span>{paper.paperContent ? paper.paperContent.judgeQuestions[index].questionUserScore : ''}</span>
              </div> : ''}
            </div>
          )
        }) : ''
      }
      <Button onClick={handleSubmit} className={paper.complete && paper.complete === 1 ? 'hidden' : ''}>提交</Button>
    </div>
  )
}
