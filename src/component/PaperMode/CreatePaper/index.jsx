import React from 'react'
import { Form, Input, Select, Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'

import './index.css'
import axios from '../../../utils/axios'
import { API_URL } from '../../../config'

export default function CreatePaper(props) {

  const [qGradeAttrs, setQGradeAttrs] = React.useState([{ attrName: '小学', attrValue: 1 }, { attrName: '初中', attrValue: 2 }, { attrName: '高中', attrValue: 3 }, { attrName: '大学', attrValue: 4 }])
  const [subjectPage, setSubjectPage] = React.useState([])

  const navigate = useNavigate()
  const { forceRefresh } = props

  React.useEffect(() => {
    axios.get(`${API_URL}/subject/page`).then((response) => {
      setSubjectPage(response.data.data)
    })
  }, [])

  function onFinish(values) {
    console.log(values);
    axios.post(`${API_URL}/paper`, values)
      .then((response) => {
        if (response.data.code == 200) {
          message.success('创建成功')
          navigate('/paper_mode')
          forceRefresh()
        } else {
          message.warning('创建出现问题')
        }
      })
      .catch(() => {
        message.error('创建遇到异常')
      })
  }

  return (
    <div className='create-paper-container'>
      <div className='paper-form-container'>
        <Form layout='horizontal' labelCol={{ span: 8 }}
          wrapperCol={{ span: 20 }} onFinish={onFinish}>
          <Form.Item name={'paperName'} label='试卷名' rules={[
            {
              required: true,
              message: '请输入试卷名',
            },
          ]}>
            <Input />
          </Form.Item>
          <Form.Item name={'subjectName'} label='学科' rules={[
            {
              required: true,
              message: '请选择学科',
            },
          ]}>
            <Select>
              {
                subjectPage.records !== undefined ?
                  subjectPage.records.map((record) => {
                    return <Select.Option key={record.id} value={record.name}>{record.name}</Select.Option>
                  }) : ''
              }
            </Select>
          </Form.Item>
          <Form.Item name={'gradeLevel'} label='年级' rules={[
            {
              required: true,
              message: '请选择年级',
            },
          ]}>
            <Select>
              {
                qGradeAttrs.map((qGradeAttr, index) => {
                  return <Select.Option value={qGradeAttr.attrValue} key={qGradeAttr.attrName}>{qGradeAttr.attrName}</Select.Option>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{
            offset: 12,
            span: 16,
          }}>
            <Button type='primary' htmlType='submit'>
              创建
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
