import { Menu } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import { isEmpty } from 'lodash-es'
import { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useRoutes } from 'react-router-dom'
import { routes } from '../route.config'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { RouteItem } from './types'
import { flattenRoutes } from './utils'

const flattenedRoutes = flattenRoutes(routes, [])

function NavItems({ data }: { data: RouteItem[] }) {
  if (isEmpty(data)) {
    return <></>
  }

  // eslint-disable-next-line consistent-return
  return (
    <>
      {data.map(item => {
        if (isEmpty(item.children)) {
          return (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.path && <Link to={item.path}>{item.title}</Link>}
            </Menu.Item>
          )
        }

        return (
          <SubMenu title={item.title} key={item.key} icon={item.icon}>
            {item.children && NavItems({ data: item.children })}
          </SubMenu>
        )
      })}
    </>
  )
}

export function useRoute() {
  const currentLocation = useLocation()

  if (currentLocation.pathname) {
    return flattenedRoutes.find(item => currentLocation.pathname.startsWith(item.path))
  }

  return null
}

export function Navs() {
  const route = useRoute()
  const [openKeys, setOpenKeys] = useState<string[]>()
  const [selectedKeys, setSelectedKeys] = useState<string[]>()

  useEffect(() => {
    if (route) {
      setOpenKeys(route?.ancestorKeys ?? [])
      setSelectedKeys([route?.key ?? '1'])
    }
  }, [route])

  return (
    <Menu theme="dark" mode="inline" openKeys={openKeys} selectedKeys={selectedKeys}>
      {NavItems({ data: routes })}
    </Menu>
  )
}

function NoMatch() {
  const currentLocation = useLocation()

  return (
    <div>
      <h3>
        <span>No match for </span>
        <code>{currentLocation.pathname}</code>
      </h3>
    </div>
  )
}

export function Routes2() {
  const configs = isEmpty(flattenedRoutes)
    ? []
    : [
        {
          path: '/',
          element: <Navigate replace to={{ pathname: flattenedRoutes[0].path }} />,
        },
        ...routes,
        {
          path: '*',
          element: <NoMatch />,
        },
      ]

  return useRoutes(configs)
}
