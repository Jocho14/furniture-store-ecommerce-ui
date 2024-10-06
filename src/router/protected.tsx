import { Suspense } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Navigate, Outlet } from 'react-router-dom'

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  )
}

type RestrictAccessProps = {
  children: React.ReactNode
  accessCallback: () => boolean
}

function RestrictAccess({ children, accessCallback }: RestrictAccessProps) {
  return accessCallback() ? <>{children}</> : <Navigate to="/" replace />
}

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <h1>Home</h1>
      },
      {
        path: 'dashboard',
        element: (
          <RestrictAccess accessCallback={() => true}>
            <h1>Dashboard</h1>
          </RestrictAccess>
        )
      }
    ]
  }
]
