import { ReactElement, ReactNode } from 'react'

interface BaseRouteItem {
  /** key 必须唯一。 */
  key: string
  title: string
  icon?: ReactNode
}

export interface NormalRouteItem extends BaseRouteItem {
  path: string
  children?: never
  element: ReactElement | null
}

export interface SubrouteItem extends BaseRouteItem {
  path?: never
  // eslint-disable-next-line no-use-before-define
  children: RouteItem[]
  component?: never
}

type RouteItem = NormalRouteItem | SubrouteItem

export interface FlattenedNavItem extends NormalRouteItem {
  /**
   * 由所有祖先节点的 key 组成的数组，按照正序排列，如：["k1", "k2", ... ]，当前节点为根节点时该属性为空数组。
   * */
  ancestorKeys: string[]
}

export type { RouteItem }
