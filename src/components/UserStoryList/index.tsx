import * as React from "react"
import { useSelector } from "react-redux"
import { useQuery } from "react-query"

import { LazyComponent } from "../LazyComponent"
import { simpleStoryService } from "../../services/SimpleStoryService"
import { getAuth } from "../../store/selectors"
import { StoryList } from "../StoryList"

type IUserStoryListProps = {
  userId?: string
}

function UserStoryList(props: IUserStoryListProps) {
  const { userId } = props
  const { user, authToken } = useSelector(getAuth)

  const {
    isLoading,
    data: userStoriesResponse,
    error,
  } = useQuery(["user-story-list"], () =>
    simpleStoryService.getStoriesPreviewByUserId(`${userId}`, `${user?.id}`, `${authToken}`),
  )

  const userStories = userStoriesResponse?.data

  return (
    <LazyComponent
      isLoading={isLoading}
      data={userStories}
      noDataMessage='No user found'
      error={error}
    >
      <StoryList stories={userStories!} />
    </LazyComponent>
  )
}

export { UserStoryList }
