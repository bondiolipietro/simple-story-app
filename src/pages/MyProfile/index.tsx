import * as React from "react"
import { useSelector } from "react-redux"

import { Profile } from "@/components/Profile"
import { getAuth } from "@/store/selectors"

function MyProfile() {
  const { user } = useSelector(getAuth)

  return <Profile user={user} />
}

export { MyProfile }
