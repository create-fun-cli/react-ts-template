import { mailApi, MailListItemInfo } from '@/apis/'
import { Badge, Breadcrumb, Card, Descriptions, PageHeader, Skeleton } from 'antd'
import { useGame } from 'components'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getObjectName, MailType } from 'views/Mail/Mail'

interface MailDetailData extends MailListItemInfo {
  type: MailType
  id: string
}

export const MailDetai = () => {
  const params = useParams()
  const [detail, setDetail] = useState<MailDetailData>()
  const game = useGame()
  const type = params.type as MailType
  const id = params.id as string
  const mail_id = params.mail_id as string
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const data = await mailApi.getMailDetail(type, game.value, { id, mail_id })
        setDetail(Object.assign({}, data.info, { type, id }))
        setLoading(false)
      } catch (_) {}
    })()
  }, [game.value, id, mail_id, type])

  return (
    <>
      <PageHeader
        breadcrumbRender={() => (
          <Breadcrumb style={{ marginBottom: '16px' }}>
            <Breadcrumb.Item>
              <Link to={'/mail'}>邮件</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{params.id}</Breadcrumb.Item>
          </Breadcrumb>
        )}
      />

      <Card loading={loading} title={'邮件详情'}>
        <Skeleton active loading={loading}>
          <Descriptions column={2}>
            <Descriptions.Item label={`${getObjectName(type)}ID`}>{detail?.id}</Descriptions.Item>
            <Descriptions.Item label="类目">{detail?.category}</Descriptions.Item>
            <Descriptions.Item label="状态">
              {detail?.status === 0 ? <Badge status="default" text="未读" /> : <Badge status="success" text="已读" />}
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">{detail?.ctime}</Descriptions.Item>
            <Descriptions.Item label="发件人">{detail?.sender}</Descriptions.Item>
            <Descriptions.Item label="主题">{detail?.subject}</Descriptions.Item>
            <Descriptions.Item label="附件">{detail?.attachment}</Descriptions.Item>
            <Descriptions.Item label="附件失效时间">{detail?.attachment_expiration_timestamp}</Descriptions.Item>
            <Descriptions.Item label="内容">{detail?.body}</Descriptions.Item>
          </Descriptions>
        </Skeleton>
      </Card>
    </>
  )
}
