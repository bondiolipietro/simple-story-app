import React from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { Profile } from '../../components/Profile'
import { AppRoutes } from '../../constants/AppRoutes'
import { simpleStoryService } from '../../services/SimpleStoryService'
import { getAuth } from '../../store/selectors'
import { IDefaultErrorResponse, IStoryPreview } from '../../types'

function MyProfile() {
  const { user } = useSelector(getAuth)

  return <Profile user={user!} />
}

export { MyProfile }
