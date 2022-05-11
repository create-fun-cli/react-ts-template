import menuItems from '@/menu.config'
import routes from '@/route.config'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { BackTop, Button, Layout } from 'antd'
import { Menu, Routes } from 'antd-menu-router'
import { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './App.module.scss'
import './App.scss'
import logo from './assets/logo.svg'

const { Header, Content, Sider } = Layout

const App = () => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Layout>
      <Sider collapsible trigger={null} collapsed={collapsed}>
        <div className={styles.SiderHeader}>
          <img src={logo} className={styles.Logo} alt="logo" />
          <CSSTransition unmountOnExit in={!collapsed} timeout={400} classNames="fade">
            <span className={styles.SiderTitle}>{import.meta.env.VITE_SITE_TITLE}</span>
          </CSSTransition>
        </div>
        <aside>
          <Menu items={menuItems} />
        </aside>
      </Sider>
      <Layout>
        <Header className={styles.Header}>
          <Button type="primary" size="small" style={{ marginRight: '16px' }} onClick={toggleCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </Header>
        <Content className={styles.Content}>
          <Routes routes={routes} />
          <BackTop></BackTop>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
