import * as React from "react"
import { useQuery } from "react-query"
import { Navigate, useParams } from "react-router-dom"

import { Profile } from "@/components/Profile"
import { LazyComponent } from "@/components/LazyComponent"
import { userService } from "@/services/api/user-service"
import { AppRoutes } from "@/constants/AppRoutes"

function UserProfile() {
  const { id } = useParams()

  if (!id) {
    return <Navigate to={AppRoutes.HOME} replace />
  }

  const { isLoading, data: userResponse, error } = useQuery(["user"], () => userService.getUserPreviewById(id ?? ""))

  const user = userResponse?.data

  return (
    <LazyComponent isLoading={isLoading} data={user} noDataMessage='No user found' error={error}>
      <Profile user={user} />
    </LazyComponent>
  )
}

export { UserProfile }
