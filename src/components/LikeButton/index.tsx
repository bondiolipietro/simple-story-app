import React from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

import style from './style.module.scss'

type ILikeButtonProps = {
  isLiked: boolean
  like: () => void
  dislike: () => void
}

function LikeButton(props: ILikeButtonProps) {
  const { isLiked, like, dislike } = props

  return (
    <button
      type='button'
      onClick={!isLiked ? like : dislike}
      className={`${style['like-btn']} ${isLiked && style['like-btn--liked']}`}
    >
      {isLiked ? <FaHeart /> : <FaRegHeart />}
    </button>
  )
}

export { LikeButton }
