import { Button, Card, Modal, Table, TableColumnsType } from 'antd'
import * as React from 'react'
import { useState } from 'react'
import GroupModal from './GroupModal'

const columns: TableColumnsType<any> = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
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
    render: () => {
      return (
        <>
          <Button
            danger
            type="link"
            onClick={() => {
              Modal.confirm({
                title: '删除组',
                content: '确定要删除组 123 吗？',
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
      )
    },
  },
]

const dataSource = [
  {
    key: '1',
    name: 'group1',
    date: '2018-09-01',
  },
  {
    key: '2',
    name: 'group2',
    date: '2018-09-01',
  },
]

export const PermissionGroups = () => {
  const [isModelVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  return (
    <>
      <Card
        title="组"
        extra={
          <Button type="primary" onClick={showModal}>
            创建组
          </Button>
        }
      >
        <Table dataSource={dataSource} columns={columns}></Table>
      </Card>
      <GroupModal
        visible={isModelVisible}
        onClose={() => {
          setIsModalVisible(false)
        }}
      />
    </>
  )
}
