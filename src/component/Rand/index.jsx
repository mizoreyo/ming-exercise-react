import React from 'react'
import axios from '../../utils/axios'
import { Checkbox, Form, Divider } from 'antd'
import qs from 'qs'

import { API_URL } from '../../config'

import './index.css'
import Question from '../Question'

export default function Rand() {

  const [question, setQuestion] = React.useState({})
  const formRef = React.useRef()

  const [attrs, setAttrs] = React.useState({
    qTypeAttrs: [{ attrName: '单选题', attrValue: 1 }, { attrName: '多选题', attrValue: 2 }, { attrName: '填空题', attrValue: 3 }, { attrName: '判断题', attrValue: 4 }],
    qDiffAttrs: [{ attrName: '简单', attrValue: 1 }, { attrName: '中等', attrValue: 2 }, { attrName: '难', attrValue: 3 }],
    qGradeAttrs: [{ attrName: '小学', attrValue: 1 }, { attrName: '初中', attrValue: 2 }, { attrName: '高中', attrValue: 3 }, { attrName: '大学', attrValue: 4 }]
  })

  function refreshQuestion() {
    const form = formRef.current
    axios.get(`${API_URL}/question/random`, {
      params: {
        ...form.getFieldValue(),
        limit: 1
      },
      paramsSerializer: params => {
        return qs.stringify(params, { indices: false })
      }
    }).then((response) => {
      console.log(response);
      if (response.data.data.length === 1) {
        setQuestion(response.data.data[0])
      } else {
        setQuestion({})
      }
    })
  }

  function getSubjectPage() {
    axios.get(`${API_URL}/subject/page`).then((response) => {
      setAttrs({ ...attrs, subjectPage: response.data.data })
    })
  }

  React.useEffect(() => {
    getSubjectPage()
    refreshQuestion()
  }, [])

  return (
    <div className='rand-container'>
      <div className='rand-header'>
        <Form className='rand-form' ref={formRef}>
          学科:
          <Form.Item name="subjectNameList">
            {
              <Checkbox.Group onChange={refreshQuestion}>
                {
                  attrs.subjectPage ?
                    attrs.subjectPage.records.map((record) => {
                      return <Checkbox key={record.id} value={record.name}>{record.name}</Checkbox>
                    }) : ''
                }
              </Checkbox.Group>
            }
          </Form.Item>
          年级:
          <Form.Item name="gradeLevelList">
            {
              <Checkbox.Group onChange={refreshQuestion}>
                {
                  attrs.qGradeAttrs.map((qGradeAttr) => {
                    return <Checkbox key={qGradeAttr.attrName} value={qGradeAttr.attrValue}>{qGradeAttr.attrName}</Checkbox>
                  })
                }
              </Checkbox.Group>
            }
          </Form.Item>
          题型:
          <Form.Item name="questionTypeList">
            {
              <Checkbox.Group onChange={refreshQuestion}>
                {
                  attrs.qTypeAttrs.map((qTypeAttr) => {
                    return <Checkbox key={qTypeAttr.attrName} value={qTypeAttr.attrValue}>{qTypeAttr.attrName}</Checkbox>
                  })
                }
              </Checkbox.Group>
            }
          </Form.Item>
          难度:
          <Form.Item name="difficultyList">
            {
              <Checkbox.Group onChange={refreshQuestion}>
                {
                  attrs.qDiffAttrs.map((qDiffAttr) => {
                    return <Checkbox key={qDiffAttr.attrName} value={qDiffAttr.attrValue}>{qDiffAttr.attrName}</Checkbox>
                  })
                }
              </Checkbox.Group>
            }
          </Form.Item>
        </Form>
      </div>
      <Divider />
      {question.questionInfo ? <Question question={question} refreshQuestion={refreshQuestion} /> : '好像没有题哦~'}

    </div>
  )
}
