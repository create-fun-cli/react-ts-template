// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { RouteItem } from '@/routes/types'
import { MailOutlined, SafetyCertificateOutlined } from '@ant-design/icons'
import { MailList, PermissionList } from 'views'

export const routes: RouteItem[] = [
  {
    key: 'avatar',
    title: '邮件',
    path: '/avatar',
    icon: <MailOutlined />,
    element: <MailList />,
  },
  {
    key: 'permission',
    title: '权限',
    path: '/permission',
    icon: <SafetyCertificateOutlined />,
    element: <PermissionList />,
  },
]
