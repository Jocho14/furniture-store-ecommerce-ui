// eslint-disable-next-line import/no-extraneous-dependencies
import { useRoutes } from 'react-router-dom'

import { publicRoutes } from './public'
import { protectedRoutes } from './protected'

export function AppRoutes() {
  const routes = useRoutes([...publicRoutes, ...protectedRoutes])

  return <>{routes}</>
}
