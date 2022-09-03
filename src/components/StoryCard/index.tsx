import React from 'react'
import { generatePath, Link } from 'react-router-dom'

import style from './style.module.scss'

import { IStoryPreview } from '../../types'
import { AppRoutes } from '../../constants/AppRoutes'

type IStoryCardProps = {
  story: IStoryPreview
}

function StoryCard(props: IStoryCardProps) {
  const { story } = props

  return (
    <Link to={generatePath(AppRoutes.STORY, { id: story.id })} className={style['story-card']}>
      <img
        src={story.info.image.url}
        className={style['story-card__img']}
        alt={story.info.image.alt}
      />
      <div className={style['story-card__title']}>{story.info.title}</div>
      <div className={style['story-card__desc']}>{story.info.description}</div>
    </Link>
  )
}

export { StoryCard }
