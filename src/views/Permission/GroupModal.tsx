import { Button, Checkbox, Col, Collapse, Form, Input, Modal, Row } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import * as React from 'react'
import { FunctionComponent, useState } from 'react'

const { Panel } = Collapse

export interface GroupModalProps {
  visible?: boolean
  onClose?: VoidFunction
}

// TODO: 替换成真实的权限
const permissions = [
  {
    category: '邮件',
    permissions: [
      { label: '查看', value: 'view1' },
      { label: '新建', value: 'create1' },
      { label: '删除', value: 'delete1' },
    ],
  },
  {
    category: '用户',
    permissions: [
      { label: '查看', value: 'view2' },
      { label: '新建', value: 'create2' },
      { label: '删除', value: 'delete2' },
    ],
  },
]

const GroupModal: FunctionComponent<GroupModalProps> = props => {
  const [form] = useForm()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const { visible, onClose } = props

  const onFinish = (value: { name: string; permissions: string[] }) => {
    setConfirmLoading(true)
    setTimeout(() => {
      console.log(value)
      setConfirmLoading(false)
      onClose?.()
      form.resetFields()
    }, 3000)
  }

  const onCancel = () => {
    onClose?.()
    form.resetFields()
  }

  return (
    <Modal
      visible={visible}
      title="创建组"
      width={800}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          取消
        </Button>,
        <Button form="form" key="submit" type="primary" loading={confirmLoading} htmlType="submit">
          确定
        </Button>,
      ]}
      onCancel={onCancel}
    >
      <Form id="form" form={form} autoComplete="off" layout="vertical" onFinish={onFinish}>
        <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入名称' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="权限" name="permissions">
          <Checkbox.Group style={{ width: '100%' }}>
            <Collapse defaultActiveKey={permissions.map(({ category }) => category)}>
              {permissions.map(item => {
                return (
                  <Panel header={item.category} key={item.category}>
                    <Row>
                      {item.permissions.map(permission => (
                        <Col span={8} key={permission.value}>
                          <Checkbox value={permission.value}>{permission.label}</Checkbox>
                        </Col>
                      ))}
                    </Row>
                  </Panel>
                )
              })}
            </Collapse>
          </Checkbox.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}

GroupModal.defaultProps = {
  visible: false,
}

export default GroupModal
