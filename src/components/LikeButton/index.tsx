import * as React from "react"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { useSelector } from "react-redux"
import { IconButton } from "@mui/material"

import { getAuth } from "@/store/selectors"

import style from "./style.module.scss"

type ILikeButtonProps = {
  isLiked: boolean
  like: () => void
  dislike: () => void
}

function LikeButton(props: ILikeButtonProps) {
  const { isLiked, like, dislike } = props

  const { isAuthenticated } = useSelector(getAuth)

  return (
    <span className={`${style["like-btn"]} ${isLiked && style["like-btn--liked"]}`}>
      <IconButton disabled={!isAuthenticated} onClick={!isLiked ? like : dislike}>
        {/* <button
        type='button'

        className={`${style["like-btn"]} ${isLiked && style["like-btn--liked"]}`}
      > */}
        {isLiked ? <FaHeart /> : <FaRegHeart />}
        {/* </button> */}
      </IconButton>
    </span>
  )
}

export { LikeButton }
