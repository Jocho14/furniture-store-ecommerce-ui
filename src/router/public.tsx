// eslint-disable-next-line import/no-extraneous-dependencies
import { Navigate } from 'react-router-dom'

export const publicRoutes = [
  {
    path: '/',
    element: <Navigate to="/login" replace />
  },
  {
    path: '/auth/*',
    elment: <h1>Auth</h1>
  }
]
