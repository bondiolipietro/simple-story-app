import * as React from "react"
import { useSelector } from "react-redux"
import { useQuery } from "react-query"

import { LazyComponent } from "@/components/LazyComponent"
import { StoryList } from "@/components/StoryList"
import { getAuth } from "@/store/selectors"
import { simpleStoryService } from "@/services/api/story-service"

type IUserStoryListProps = {
  userId?: string
}

function UserStoryList(props: IUserStoryListProps) {
  const { userId } = props

  const {
    isLoading,
    data: userStoriesResponse,
    error,
  } = useQuery(["user-story-list"], () => simpleStoryService.getStoriesPreviews({ userId, skip: 0, limit: 10 }))

  const userStories = userStoriesResponse?.data

  return (
    <LazyComponent isLoading={isLoading} data={userStories} noDataMessage='No user found' error={error}>
      <StoryList stories={userStories!} />
    </LazyComponent>
  )
}

export { UserStoryList }
