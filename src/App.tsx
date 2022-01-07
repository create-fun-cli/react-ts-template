import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import { createElement, useState } from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import styles from './App.module.scss'
import './App.scss'
import logo from './assets/logo.svg'
import { Navs, Routes2 } from './routes'

const { Header, Content, Sider } = Layout

function App() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Router>
      <Layout>
        <Sider collapsible trigger={null} collapsed={collapsed}>
          <div className={styles['sider-header']}>
            <img src={logo} className={styles.logo} alt="logo" />
            <CSSTransition unmountOnExit in={!collapsed} timeout={400} classNames="fade">
              <span className={styles['sider-title']}>{import.meta.env.VITE_SITE_TITLE}</span>
            </CSSTransition>
          </div>
          <aside>
            <Navs />
          </aside>
        </Sider>
        <Layout>
          <Header>
            {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: styles.trigger,
              onClick: () => {
                setCollapsed(!collapsed)
              },
            })}
          </Header>
          <Content className={styles.content}>
            <Routes2 />
          </Content>
        </Layout>
      </Layout>
    </Router>
  )
}

export default App
