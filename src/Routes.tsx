import { Navigate, useRoutes } from 'react-router-dom'
import { lazy } from 'react'

const Dashboard = lazy(() => import('views/Dashboard'))

const Routes = () =>
  useRoutes([
    {
      path: '/',
      element: <Navigate replace to={{ pathname: '/dashboard' }} />,
    },
    {
      path: 'dashboard',
      element: <Dashboard />,
    },
  ])

export default Routes
