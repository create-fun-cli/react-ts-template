import { MailOutlined, SafetyCertificateOutlined } from '@ant-design/icons'
import { RouteConfig } from 'antd-menu-router'
import { Mail, MailDetai, PermissionGroups, PermissionUsers } from 'views'

const config: RouteConfig[] = [
  {
    key: 'mail',
    title: '邮件',
    path: '/mail',
    icon: <MailOutlined />,
    element: <Mail />,
  },
  {
    key: 'mail-detail',
    title: '邮件',
    path: '/mail/:id/:type/:mail_id',
    icon: <MailOutlined />,
    element: <MailDetai />,
    hidden: true,
  },
  {
    key: 'permission',
    title: '权限',
    icon: <SafetyCertificateOutlined />,
    children: [
      {
        key: 'users',
        title: '用户',
        path: '/permission/users',
        element: <PermissionUsers />,
      },
      {
        key: 'groups',
        title: '组',
        path: '/permission/groups',
        element: <PermissionGroups />,
      },
    ],
  },
]

export default config
