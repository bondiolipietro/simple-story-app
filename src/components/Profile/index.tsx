import React from 'react'

import style from './style.module.scss'

import { UserStoryList } from '../UserStoryList'
import { IUserInfo, IUserPreview } from '../../types'

type IProfileProps = {
  user: IUserInfo | IUserPreview
}

function Profile(props: IProfileProps) {
  const { user } = props

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
        <UserStoryList userId={user.id} />
      </div>
    </div>
  )
}

export { Profile }
