import * as React from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"

import { Profile } from "../../components/Profile"
import { userService } from "../../services/UserService"
import { IDefaultErrorResponse, IDefaultResponse, IUserPreview } from "../../types"
import { LazyComponent } from "../../components/LazyComponent"

function UserProfile() {
  const { id } = useParams()

  const {
    isLoading,
    data: userResponse,
    error,
  } = useQuery(["user"], () => userService.getUserPreview(id ?? ""))

  const user = userResponse?.data

  return (
    <LazyComponent isLoading={isLoading} data={user} noDataMessage='No user found' error={error}>
      <Profile user={user} />
    </LazyComponent>
  )
}

export { UserProfile }
