import { HomeOutlined } from '@ant-design/icons'
import { MenuItem } from 'antd-menu-router'

const menuItems: MenuItem[] = [
  {
    key: 'dashboard',
    path: '/dashboard',
    label: '仪表盘',
    icon: <HomeOutlined />,
  },
]

export default menuItems
