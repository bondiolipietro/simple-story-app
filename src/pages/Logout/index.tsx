import * as React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

import { AppRoutes } from "../../constants/AppRoutes"
import { userService } from "../../services/UserService"
import { getAuth } from "../../store/selectors"

function Logout() {
  const dispatch = useDispatch()
  const { user, authToken } = useSelector(getAuth)

  dispatch({ type: "CLEAR_STORE" })

  userService.logout(`${user?.id}`, `${authToken}`)

  return <Navigate to={AppRoutes.HOME} />
}

export { Logout }
