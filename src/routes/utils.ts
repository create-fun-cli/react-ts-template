import { NormalRouteItem } from 'src/routes/types'
import type { FlattenedNavItem, RouteItem } from 'src/routes/types'

// 递归生成扁平化的数据
export function flattenRoutes(items: RouteItem[], flattened: FlattenedNavItem[], openKeys: string[] = []) {
  // eslint-disable-next-line no-restricted-syntax
  for (const item of items) {
    if (item.children) {
      flattenRoutes(item.children, flattened, [...openKeys, item.key])
    } else {
      flattened.push({
        ...(item as NormalRouteItem),
        ancestorKeys: openKeys as string[],
      })
    }
  }
  return flattened
}
