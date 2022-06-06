import React from 'react'
import { Form, Radio, Space, Button, message, Checkbox, Input } from 'antd'
import axios from 'axios'

import { API_URL } from '../../config'
import tokenUtils from '../../utils/token-utils'

import './index.css'

export default function Question(props) {

  const [optionSigns, setOptionSigns] = React.useState(['A', 'B', 'C', 'D', 'E', 'F', 'G'])
  const canSubmitRef = React.useRef()
  const formRef = React.useRef()
  canSubmitRef.current = true

  const { questionInfo, options, id, questionType } = props.question
  const { refreshQuestion, hiddenSubmit, questionNum, formName, setAnswer } = props

  function onFinish(values) {
    if (Array.isArray(values.response)) {
      const arrayX = values.response
      values.response = arrayX.join()
    }
    if (canSubmitRef.current) {
      axios.post(`${API_URL}/question/validate/${id}`, values, {
        headers: {
          Authorization: tokenUtils.getToken()
        }
      })
        .then((response) => {
          console.log(response);
          if (response.data.code === 200) {
            message.success("回答正确！")
          } else {
            message.warning("回答错误!")
          }
          setTimeout(() => {
            refreshQuestion()
            const form = formRef.current
            form.resetFields();
          }, 2000)
          canSubmitRef.current = false
        })
    }
  }

  function handleValuesChange(changedValues) {
    if (Array.isArray(changedValues.response)) {
      const arrayX = changedValues.response
      changedValues.response = arrayX.join()
    }
    const { response } = changedValues;
    console.log(response, questionType, questionNum);
    if (setAnswer) {
      setAnswer(questionType, questionNum, response)
    }
  }

  return (
    <div className='question-container'>
      <Form onFinish={onFinish} ref={formRef} name={formName} onValuesChange={handleValuesChange}>
        <p>{questionNum ? <span>{questionNum}、</span> : ''}{questionInfo ? questionInfo : ''}</p>
        <Form.Item name='response' rules={[{ required: true, message: '请选择答案' }]} className={questionType === 1 ? '' : 'hidden'}>
          <Radio.Group>
            <Space direction="vertical">
              {
                options ? options.map((option, index) => {
                  return <Radio key={index} value={optionSigns[index]}>{optionSigns[index]}. {option}</Radio>
                }) : ''
              }
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item name='response' rules={[{ required: true, message: '请选择答案' }]} className={questionType === 2 ? '' : 'hidden'}>
          <Checkbox.Group>
            <Space direction='vertical'>
              {
                options ? options.map((option, index) => {
                  return <Checkbox key={index} value={optionSigns[index]}>{optionSigns[index]}. {option}</Checkbox>
                }) : ''
              }
            </Space>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item name='response' rules={[{ required: true, message: '请选择答案' }]} className={questionType === 4 ? '' : 'hidden'}>
          <Radio.Group>
            <Space direction='vertical'>
              <Radio value="true">正确</Radio>
              <Radio value="false">错误</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item name='response' rules={[{ required: true, message: '请输入答案' }]} className={questionType === 3 ? '' : 'hidden'}>
          <Input placeholder='请输入答案...'></Input>
        </Form.Item>
        <Form.Item className={`${hiddenSubmit ? 'hidden' : ''}`}>
          <Button type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    </div >
  )
}
