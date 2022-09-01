import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { AppRoutes } from '../../constants/AppRoutes'
import { logger } from '../../utils/logger'

type IProtectedRouteProps = {
  isAllowed: boolean
  redirectPath?: string
  children?: any
}

function ProtectedRoute({
  isAllowed,
  redirectPath = AppRoutes.HOME,
  children,
}: IProtectedRouteProps) {
  const location = useLocation()

  if (!isAllowed) {
    logger.info('Trying to access {route} without permission.', {
      route: location.pathname,
    })

    return <Navigate to={redirectPath} replace />
  }

  return children || <Outlet />
}

export { ProtectedRoute }
