import { AllianceMailListItem, KingdomMailListItem, mailApi, MailListItem, PlayerMailListItem } from '@/apis'

import { Badge, Button, Form, Input, Modal, Table } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { ColumnsType } from 'antd/lib/table'
import { useGame } from 'components'
import { Key, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getObjectName, MailType } from 'views/Mail/Mail'
import { SentMail } from './SentMail'

export const MailList = ({ type }: { type: MailType }) => {
  const game = useGame()
  const [dataSource, setDataSource] = useState<MailListItem[]>([])
  const [lastData, setLastData] = useState<MailListItem[]>([])
  const [hasMore, setHasMore] = useState(false)
  const [mailId, setMailId] = useState<number | undefined>()
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [form] = useForm()

  const columns: ColumnsType<MailListItem> = [
    {
      key: 'id',
      title: 'ID',
      render(item: MailListItem) {
        const mail_id = item.info.mail_id

        function getId() {
          if ((item as KingdomMailListItem).kingdom_id) {
            return (item as KingdomMailListItem).kingdom_id
          } else if ((item as AllianceMailListItem).alliance_id) {
            return (item as AllianceMailListItem).alliance_id
          } else {
            return (item as PlayerMailListItem).uid
          }
        }

        return <Link to={`${getId()}/${type}/${mail_id}`}>{mail_id}</Link>
      },
    },
    {
      key: 'sender',
      title: '发件人',
      dataIndex: ['info', 'sender'],
    },
    {
      key: 'subject',
      title: '主题',
      dataIndex: ['info', 'subject'],
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: ['info', 'status'],
      render(val) {
        return val === 0 ? <Badge status="default" text="未读" /> : <Badge status="success" text="已读" />
      },
    },
    {
      key: 'created_at',
      title: '发送时间',
      dataIndex: ['info', 'ctime'],
    },
    {
      key: 'action',
      title: '操作',
      align: 'center',
      width: '100px',
      render(mail: MailListItem) {
        return (
          <Button
            danger
            type={'text'}
            size="small"
            onClick={() => {
              Modal.confirm({
                title: '删除邮件',
                centered: true,
                content: (
                  <>
                    <span>确定要删除邮件 </span>
                    <span style={{ color: 'red' }}>{mail.info.mail_id}</span>
                    <span> 吗？</span>
                  </>
                ),
                onOk: async () => {
                  try {
                    await mailApi.deleteMail(type, game.value, {
                      id: form.getFieldValue('id'),
                      mail_ids: [mail.info.mail_id],
                    })
                    await refreshList()
                  } catch (_) {}
                },
              })
            }}
          >
            删除
          </Button>
        )
      },
    },
  ] as ColumnsType<MailListItem>

  async function fetchList() {
    const { id, category } = form.getFieldsValue()

    try {
      switch (type) {
        case MailType.Kingdom:
          return await mailApi.getKingdomMailList(game.value, { kingdom_id: id, mailId })
        case MailType.Alliance:
          return await mailApi.getAllianceMailList(game.value, { alliance_id: id, mailId })
        case MailType.Player:
          return await mailApi.getPlayerMailList(game.value, {
            uid: id,
            mailId,
            category,
          })
      }
    } catch (_) {
      return []
    }
  }

  async function loadMore() {
    const list = await fetchList()
    setLastData(list)
    setDataSource(prevState => prevState.concat(list))
  }

  async function refreshList() {
    setSelectedRowKeys([])
    const list = await fetchList()
    setLastData(list)
    setDataSource(list)
  }

  useEffect(() => {
    if (form.getFieldValue('id')) {
      refreshList()
    }
  }, [game, type])

  useEffect(() => {
    // 一页最多返回20条。若返回小于20条，证明没有下一页；若刚好返回20条，需要再次拉取下一页的数据才能确认是否有更多数据。后端实现如此。
    if (lastData.length === 20) {
      setHasMore(true)
    } else {
      setHasMore(false)
    }

    if (lastData.length > 0) {
      setMailId(lastData[lastData.length - 1].info.mail_id)
    }
  }, [lastData])

  const onSelectChange = (keys: Key[]) => {
    setSelectedRowKeys(keys)
  }

  const batchDelete = async () => {
    Modal.confirm({
      title: '批量删除邮件',
      centered: true,
      content: (
        <>
          <span>确定要批量删除邮件吗？</span>
        </>
      ),
      onOk: async () => {
        try {
          await mailApi.deleteMail(type, game.value, { id: form.getFieldValue('id'), mail_ids: selectedRowKeys })
          await refreshList()
        } catch (_) {}
      },
    })
  }

  const onSubmit = async () => {
    await refreshList()
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Form layout="inline" form={form} style={{ marginBottom: '24px' }} autoComplete="off" onFinish={onSubmit}>
          <Form.Item
            label={`${getObjectName(type)}ID`}
            name="id"
            rules={[{ required: true, message: `请输入${getObjectName(type)}ID` }]}
          >
            <Input />
          </Form.Item>
          {type === MailType.Player && (
            <Form.Item label="分类" name="category">
              <Input />
            </Form.Item>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}>
              查询
            </Button>
          </Form.Item>
        </Form>
        <div style={{ display: 'inline-flex' }}>
          <SentMail type={type} />
          <Button danger style={{ marginLeft: '8px' }} disabled={selectedRowKeys.length === 0} onClick={batchDelete}>
            批量删除
          </Button>
        </div>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={item => item.info.mail_id}
        tableLayout="fixed"
        pagination={false}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
        }}
      />
      {hasMore && (
        <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button type="link" onClick={loadMore}>
            加载更多
          </Button>
        </div>
      )}
    </>
  )
}
