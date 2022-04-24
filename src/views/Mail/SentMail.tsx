import { Button, DatePicker, Form, Input, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useState } from 'react'
import { getObjectName, MailType } from './Mail'

const { TextArea } = Input

export const SentMail = ({ type }: { type: MailType }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const [form] = useForm()

  return (
    <>
      <Button type="primary" onClick={showModal}>
        发送邮件
      </Button>
      <Modal
        centered
        title={`发送${getObjectName(type)}邮件`}
        visible={isModalVisible}
        width="700px"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} initialValues={{ type: MailType.Kingdom }} labelCol={{ span: 4 }} autoComplete="off">
          <Form.Item label="ID" name="id" rules={[{ required: true, message: '请输入ID' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="主题" name="subject" rules={[{ required: true, message: '请输入主题' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="类目" name="category" rules={[{ required: true, message: '请输入ID' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="内容" name="content" rules={[{ required: true, message: '请输入ID' }]}>
            <TextArea showCount style={{ height: 120 }} />
          </Form.Item>
          <Form.Item label="附件" name="attachment">
            <Input />
          </Form.Item>
          <Form.Item label="附件过期时间" name="attachment_expire_at">
            <DatePicker showTime></DatePicker>
          </Form.Item>
          <Form.Item label="邮件过期时间" name="mail_expire_at">
            <DatePicker showTime></DatePicker>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
