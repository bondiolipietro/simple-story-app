import * as React from "react"
import { useSelector } from "react-redux"
import { useQuery } from "react-query"

import { StoryArt } from "@/components/StoryComp/StoryArt"
import { StoryDescription } from "@/components/StoryComp/StoryDescription"
import { StoryText } from "@/components/StoryComp/StoryText"
import { LazyComponent } from "@/components/LazyComponent"
import { simpleStoryService } from "@/services/api/story-service"
import { getAuth } from "@/store/selectors"

import style from "./style.module.scss"

type IStoryProps = {
  id: string
  isShared?: boolean
  shareToken?: string
}

function StoryComp(props: IStoryProps) {
  const { id, isShared = false, shareToken = "" } = props

  const [currentFramePage, setCurrentFramePage] = React.useState(0)

  const {
    isLoading,
    data: storyResponse,
    error,
  } = useQuery(["story"], () =>
    isShared ? simpleStoryService.getStoryUsingShareToken(shareToken) : simpleStoryService.getStoryById(id),
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
