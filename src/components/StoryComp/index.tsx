import * as React from "react"
import { useSelector } from "react-redux"
import { useQuery } from "react-query"

import { StoryArt } from "./StoryArt"
import { StoryDescription } from "./StoryDescription"
import { StoryText } from "./StoryText"
import style from "./style.module.scss"

import { LazyComponent } from "../LazyComponent"
import { simpleStoryService } from "../../services/SimpleStoryService"
import { getAuth } from "../../store/selectors"

type IStoryProps = {
  id: string
  isShared?: boolean
  shareToken?: string
}

function StoryComp(props: IStoryProps) {
  const { id, isShared = false, shareToken = "" } = props

  const { user, authToken } = useSelector(getAuth)

  const [currentFramePage, setCurrentFramePage] = React.useState(0)

  const {
    isLoading,
    data: storyResponse,
    error,
  } = useQuery(["story"], () =>
    isShared
      ? simpleStoryService.getStoryUsingShareToken(shareToken, user?.id)
      : simpleStoryService.getStoryById(id, user!.id, authToken!),
  )

  const story = storyResponse?.data

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

  return (
    <LazyComponent isLoading={isLoading} data={story} error={error}>
      <div className={style["story"]}>
        <StoryArt frame={currentFrame!} />
        <StoryText frame={currentFrame!} />
        <StoryDescription frame={currentFrame!} />
      </div>
    </LazyComponent>
  )
}

export { StoryComp }
