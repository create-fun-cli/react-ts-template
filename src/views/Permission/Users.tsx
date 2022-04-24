import { Button, Card, Form, Input, Modal, Select, Table, TableColumnsType } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { FunctionComponent, useState } from 'react'

const { Option } = Select

const columns: TableColumnsType<any> = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '操作',
    width: 80,
    align: 'center',
    render: () => (
      <>
        <Button
          danger
          type="link"
          onClick={() => {
            Modal.confirm({
              title: '删除用户',
              content: '确定要删除用户 123 吗？',
              centered: true,
              onOk: () => {
                console.log('删除用户')

                return new Promise((resolve, reject) => {
                  setTimeout(() => {
                    console.log('成功删除用户')
                    resolve(true)
                  }, 2000)
                })
              },
            })
          }}
        >
          删除
        </Button>
      </>
    ),
  },
]

const groups = ['group1', 'group2', 'group3']

const dataSource = [
  {
    key: '1',
    username: '胡彦斌',
    role: '管理员',
    date: '2018-09-01',
  },
  {
    key: '2',
    username: '吴彦祖',
    role: '用户',
    date: '2018-09-01',
  },
]

export const PermissionUsers: FunctionComponent = () => {
  const [form] = useForm()
  const [isModelVisible, setIsModalVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const onFinish = (value: any) => {
    setConfirmLoading(true)
    setTimeout(() => {
      console.log(value)
      setConfirmLoading(false)
      setIsModalVisible(false)
      form.resetFields()
    }, 3000)
  }

  const onCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  return (
    <>
      <Card
        title="用户"
        extra={
          <Button type="primary" onClick={showModal}>
            添加用户
          </Button>
        }
      >
        <Table dataSource={dataSource} columns={columns}></Table>
      </Card>
      <Modal
        visible={isModelVisible}
        title="添加用户"
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
        <Form form={form} id="form" labelCol={{ span: 4 }} autoComplete="off" onFinish={onFinish}>
          <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="组" name="groups" rules={[{ required: true, message: '至少选择一个组' }]}>
            <Select allowClear mode="multiple">
              {groups.map(group => (
                <Option value={group} key={group}>
                  {group}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
