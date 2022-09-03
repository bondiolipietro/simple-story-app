import React from 'react'

import style from './style.module.scss'

import { ISize, IStoryFrame } from '../../../types'

type IStoryArtProps = {
  frame: IStoryFrame
}

function StoryArt(props: IStoryArtProps) {
  const { frame } = props

  const imageSizes: Record<ISize, string> = {
    [ISize.SMALL]: style.small,
    [ISize.MEDIUM]: style.medium,
    [ISize.LARGE]: style.large,
  }

  return (
    <div className={style['art']}>
      {frame.content.map((c) =>
        c.images.map((i) => (
          <img key={i.id} src={i.url} alt={i.alt} className={imageSizes[i.size]} />
        )),
      )}
    </div>
  )
}

export { StoryArt }
