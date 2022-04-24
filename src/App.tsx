import { AuthProvider, AuthState, GameProvider, GameSelect } from '@/components'
import routeConfig from '@/route.config'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { BackTop, Layout } from 'antd'
import generateRoute from 'antd-menu-router'
import { createElement, useState } from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import styles from './App.module.scss'
import './App.scss'
import logo from './assets/logo.svg'

const { Header, Content, Sider } = Layout
const { Navs, Routes } = generateRoute(routeConfig)

const CustomLayout = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <AuthProvider>
      <GameProvider>
        <Layout>
          <Sider collapsible trigger={null} collapsed={collapsed}>
            <div className={styles.SiderHeader}>
              <img src={logo} className={styles.Logo} alt="logo" />
              <CSSTransition unmountOnExit in={!collapsed} timeout={400} classNames="fade">
                <span className={styles.SiderTitle}>{import.meta.env.VITE_SITE_TITLE}</span>
              </CSSTransition>
            </div>
            <aside>
              <Navs />
            </aside>
          </Sider>
          <Layout>
            <Header className={styles.Header}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: styles.Trigger,
                  style: { marginBottom: '-5px' },
                  onClick: () => {
                    setCollapsed(!collapsed)
                  },
                })}
                <GameSelect />
              </div>
              <AuthState />
            </Header>
            <Content className={styles.Content}>
              <Routes />
              <BackTop></BackTop>
            </Content>
          </Layout>
        </Layout>
      </GameProvider>
    </AuthProvider>
  )
}

const App = () => {
  return (
    <Router>
      <CustomLayout />
    </Router>
  )
}

export default App
