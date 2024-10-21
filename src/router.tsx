import { createBrowserRouter } from 'react-router-dom'
import GeneralError from './pages/errors/general-error'
import MaintenanceError from './pages/errors/maintenance-error'
import NotFoundError from './pages/errors/not-found-error'
import UnauthorisedError from './pages/errors/unauthorised-error.tsx'
import AuthGuard from '@/guard/auth-guard.tsx'
import { lazy } from 'react'

const AppShell = lazy(() => import('@/components/app-shell'))
const Dashboard = lazy(() => import('@/pages/dashboard'))
const Order = lazy(() => import('@/pages/orders'))
const Product = lazy(() => import('@/pages/products'))
const Settings = lazy(() => import('@/pages/settings'))
const SignIn = lazy(() => import('@/pages/auth/sign-in-2'))
const SettingsProfile = lazy(() => import('@/pages/settings/profile'))

const router = createBrowserRouter([
  // Auth routes
  {
    path: '/sign-in',
    element: <SignIn />,
  },

  // Main routes
  {
    path: '/',
    element: (
      <AuthGuard>
        <AppShell />
      </AuthGuard>
    ),
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'orders',
        element: <Order />,
      },
      {
        path: 'products',
        element: <Product />
      },
      {
        path: 'settings',
        element: <Settings />,
        errorElement: <GeneralError />,
        children: [
          {
            index: true,
            element: <SettingsProfile />,
          },
        ],
      },
    ],
  },

  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  { path: '/401', Component: UnauthorisedError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
])

export default router
