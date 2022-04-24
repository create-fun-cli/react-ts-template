import { Card } from 'antd'
import { useState } from 'react'
import { MailList } from 'views/Mail/MailList'

export enum MailType {
  Kingdom = 'kingdom',
  Alliance = 'alliance',
  Player = 'player',
}

export function getObjectName(type: MailType) {
  switch (type) {
    case MailType.Kingdom:
      return '王国'
    case MailType.Alliance:
      return '联盟'
    case MailType.Player:
      return '玩家'
  }
}

const tabList = Object.values(MailType).map(type => ({
  key: type,
  tab: getObjectName(type),
}))

export const Mail = () => {
  const [activeTabKey, setActiveTabKey] = useState<MailType>(MailType.Kingdom)

  return (
    <>
      <Card
        title="邮件"
        activeTabKey={activeTabKey}
        tabList={tabList}
        onTabChange={(key: string) => {
          setActiveTabKey(key as MailType)
        }}
      >
        {MailList({ type: activeTabKey })}
      </Card>
    </>
  )
}
