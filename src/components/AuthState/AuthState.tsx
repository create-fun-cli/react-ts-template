import { authApi } from '@/apis'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu } from 'antd'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

const TICKET_KEY = 'ticket'
const AUTH_KEY = 'auth'
const SSO_URL = 'https://idaas.ifunplus.cn/enduser/api/application/plugin_FunPlus/sso/v1'

function getLoginUrl() {
  return `${SSO_URL}/login?service=${document.location.origin}`
}

// 跳转到IDaas换取ticket
export function redirectToLoginPage() {
  localStorage.removeItem(AUTH_KEY)
  document.location.replace(getLoginUrl())
}

export interface AuthInfo {
  username: string
  group: string
}

export const AuthContext = createContext<AuthInfo | null>(null)

export function useAuth() {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthInfo | null>(null)

  useEffect(() => {
    const state = JSON.parse(localStorage.getItem(AUTH_KEY) || 'null')

    if (state) {
      setAuthState(state)
      return
    }

    const url = new URL(document.location.href)
    const searchParams = url.searchParams

    if (searchParams.has(TICKET_KEY)) {
      // 通过ticket在后端换取用户信息
      authApi.login(searchParams.get(TICKET_KEY) as string).then(res => {
        setAuthState(res)
        localStorage.setItem(AUTH_KEY, JSON.stringify(res))
        url.searchParams.delete(TICKET_KEY)
        document.location.replace(url)
      })
    } else {
      redirectToLoginPage()
    }
  }, [])

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
}

export const AuthState = () => {
  const auth = useAuth()

  const menu = (
    <Menu>
      <Menu.Item key="logout">
        <Button
          type="text"
          className="w-full"
          onClick={() => {
            localStorage.removeItem(AUTH_KEY)
            document.location.replace(`${SSO_URL}/logout?service=${getLoginUrl()}`)
          }}
        >
          <LogoutOutlined />
          登出
        </Button>
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} placement="bottomRight">
      <Button type="link">
        <div>
          <UserOutlined style={{ marginRight: '6px' }} />
          <span>{auth?.username}</span>
        </div>
      </Button>
    </Dropdown>
  )
}
