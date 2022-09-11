import React from 'react'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'

import style from './style.module.scss'

import { LazyComponent } from '../LazyComponent'
import { simpleStoryService } from '../../services/SimpleStoryService'
import { getAuth } from '../../store/selectors'
import { IDefaultErrorResponse, IStoryPreview } from '../../types'
import { StoryList } from '../StoryList'

type IUserStoryListProps = {
  userId: string
}

function UserStoryList(props: IUserStoryListProps) {
  const { userId } = props
  const { user: loggedUser, authToken } = useSelector(getAuth)

  const {
    isLoading,
    data: userStories,
    error,
  } = useQuery<IStoryPreview[], IDefaultErrorResponse>(['user-story-list'], () =>
    simpleStoryService.getStoriesPreviewByUserId(userId, loggedUser!.id, authToken),
  )

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
