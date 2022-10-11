import * as React from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"

import { AppRoutes } from "@/constants/AppRoutes"
import { logger } from "@/services/winston-logger"

type IProtectedRouteProps = {
  isAllowed: boolean
  redirectPath?: string
}

function ProtectedRoute({ isAllowed, redirectPath = AppRoutes.HOME }: IProtectedRouteProps) {
  const location = useLocation()

  if (!isAllowed) {
    logger.info("Trying to access {route} without permission.", {
      route: location.pathname,
    })

    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}

export { ProtectedRoute }
