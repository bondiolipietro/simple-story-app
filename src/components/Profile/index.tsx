import React from 'react'

import style from './style.module.scss'

import { StoryList } from '../StoryList'
import { IStoryPreview, IUserInfo, IUserPreview, Size } from '../../types'

type IProfileProps = {
  user: IUserInfo | IUserPreview
  userStories?: Array<IStoryPreview>
}

function Profile(props: IProfileProps) {
  const { user, userStories } = props

  return (
    <div className={style['user-profile']}>
      <div className={style['presentation']}>
        <img
          src={user.avatar.url}
          className={style['presentation__avatar']}
          alt={user.avatar.alt}
        />
        <div className={style['presentation__nickname']}>{user.nickname}</div>
        <div className={style['presentation__name']}>{user.name}</div>
        <div className={style['presentation__description']}>
          {user.description || 'No description'}
        </div>
      </div>
      <div className={style['public-stories']}>
        {userStories ? <StoryList stories={userStories} /> : <div>Loading...</div>}
      </div>
    </div>
  )
}

export { Profile }
