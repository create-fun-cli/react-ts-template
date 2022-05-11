import { Navigate, RouteObject } from 'react-router-dom'
import { Dashboard } from './views/Dashboard'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate replace to={{ pathname: '/dashboard' }} />,
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
  },
]

export default routes
