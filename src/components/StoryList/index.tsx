import * as React from "react"

import { StoryCard } from "@/components/StoryCard"

import style from "./style.module.scss"

type IStoryListProps = {
  stories: IStoryPreview[]
}

function StoryList(props: IStoryListProps) {
  const { stories } = props

  return (
    <ul className={style["story-list"]}>
      {stories.map((story) => (
        <li key={story._id}>
          <StoryCard story={story} />
        </li>
      ))}
    </ul>
  )
}

export { StoryList }
