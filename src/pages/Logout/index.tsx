import React from 'react'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { AppRoutes } from '../../constants/AppRoutes'

function Logout() {
  const dispatch = useDispatch()

  dispatch({ type: 'CLEAR_STORE' })

  return <Navigate to={AppRoutes.HOME} />
}

export { Logout }
