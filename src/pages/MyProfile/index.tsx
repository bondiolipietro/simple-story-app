import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { Profile } from '../../components/Profile'
import { AppRoutes } from '../../constants/AppRoutes'
import { simpleStoryService } from '../../services/SimpleStoryService'
import { getAuth } from '../../store/selectors'
import { IStoryPreview } from '../../types'

function MyProfile() {
  const { user, authToken } = useSelector(getAuth)

  const [userStories, setUserStories] = React.useState<Array<IStoryPreview>>([])

  if (!user) {
    return <Navigate to={AppRoutes.ERROR} />
  }

  React.useEffect(() => {
    const getUserStories = async () => {
      const response = await simpleStoryService.getStoriesPreviewByUserId(user.id, authToken)

      setUserStories(response)
    }

    getUserStories()
  }, [])

  return (
    <>
      <Profile user={user} userStories={userStories} />
    </>
  )
}

export { MyProfile }
