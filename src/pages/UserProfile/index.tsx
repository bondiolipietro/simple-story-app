import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import { Profile } from '../../components/Profile'
import { userService } from '../../services/UserService'
import { IDefaultErrorResponse, IUserPreview } from '../../types'
import { LazyComponent } from '../../components/LazyComponent'

function UserProfile() {
  const { id } = useParams()

  const {
    isLoading,
    data: user,
    error,
  } = useQuery<IUserPreview, IDefaultErrorResponse>(['user'], () =>
    userService.getUserPreview(id ?? ''),
  )

  return (
    <LazyComponent isLoading={isLoading} data={user} noDataMessage='No user found' error={error}>
      <Profile user={user!} />
    </LazyComponent>
  )
}

export { UserProfile }
