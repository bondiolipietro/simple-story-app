import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { StoryArt } from './StoryArt'
import { StoryDescription } from './StoryDescription'
import { StoryText } from './StoryText'
import style from './style.module.scss'

import { simpleStoryService } from '../../services/SimpleStoryService'
import { getAuth } from '../../store/selectors'
import { IStory } from '../../types'
import { AppRoutes } from '../../constants/AppRoutes'

type IStoryProps = {
  id: string
  isShared?: boolean
  shareToken?: string
}

function StoryComp(props: IStoryProps) {
  const { id, isShared = false, shareToken = '' } = props
  const [story, setStory] = React.useState<IStory>()
  const [currentFramePage, setCurrentFramePage] = React.useState(0)

  const previousFramePage = () => {
    if (currentFramePage > 0) {
      setCurrentFramePage(currentFramePage - 1)
    }
  }
  const nextFramePage = () => {
    if (story?.frames.length && story.frames.length > currentFramePage) {
      setCurrentFramePage(currentFramePage + 1)
    }
  }

  const currentFrame = story?.frames[currentFramePage]

  const authState = useSelector(getAuth)

  React.useEffect(() => {
    const getStory = async () => {
      const response = isShared
        ? await simpleStoryService.getStoryUsingShareToken(
            shareToken || '',
            authState.user?.id || '',
          )
        : await simpleStoryService.getStoryById(
            id || '',
            authState.user?.id || '',
            authState.authToken || '',
          )

      console.log(response)
      setStory(response)
    }

    getStory()
  }, [])

  if (!currentFrame) {
    return <div>Loading</div>
  }

  return (
    <div className={style['story']}>
      <StoryArt frame={currentFrame} />
      <StoryText frame={currentFrame} />
      <StoryDescription frame={currentFrame} />
    </div>
  )
}

export { StoryComp }
