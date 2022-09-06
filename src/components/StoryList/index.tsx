import React from 'react'

import style from './style.module.scss'

import { IStoryPreview } from '../../types'
import { StoryCard } from '../StoryCard'

type IStoryListProps = {
  stories: IStoryPreview[]
}

function StoryList(props: IStoryListProps) {
  const { stories } = props

  return (
    <ul className={style['story-list']}>
      {stories.map((story) => (
        <li key={story.id}>
          <StoryCard story={story} />
        </li>
      ))}
    </ul>
  )
}

export { StoryList }
