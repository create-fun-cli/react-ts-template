import { mailApi } from '@/apis'
import { MailListItem } from '@/apis/mail'
import { Card, Table } from 'antd'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ColumnsType } from 'antd/lib/table'
import { useEffect, useState } from 'react'

export function MailList() {
  const [dataSource, setDataSource] = useState<MailListItem[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const { list } = await mailApi.getList()
        setDataSource(list)
      } catch (_) {
        setDataSource([])
      }
    })()
  }, [])

  const columns: ColumnsType<MailListItem> = [
    {
      key: 'title',
      title: '标题',
      dataIndex: 'title',
    },
    {
      key: 'created_at',
      title: '创建时间',
      dataIndex: 'created_at',
    },
  ]

  return (
    <Card title={'邮件'}>
      <Table dataSource={dataSource} columns={columns} rowKey={item => item.id}></Table>
    </Card>
  )
}
