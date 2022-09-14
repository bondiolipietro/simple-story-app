import * as React from "react"
import { generatePath, Link } from "react-router-dom"
import { useSelector } from "react-redux"

import style from "./style.module.scss"

import { IStoryPreview, IUserPreview } from "../../types"
import { AppRoutes } from "../../constants/AppRoutes"
import { simpleStoryService } from "../../services/SimpleStoryService"
import { getAuth } from "../../store/selectors"
import { userService } from "../../services/UserService"
import { WebAppHelper } from "../../utils/WebAppHelper"
import { ShareButton } from "../ShareButton"
import { LikeButton } from "../LikeButton"
import { StringHelper } from "../../utils/StringHelper"
import { ToastsHelper } from "../../utils/ToastsHelper"

type IStoryCardProps = {
  story: IStoryPreview
}

function StoryCard(props: IStoryCardProps) {
  const { story } = props
  const { isAuthenticated, user, authToken } = useSelector(getAuth)
  const storyUrl = WebAppHelper.getHostName() + generatePath(AppRoutes.STORY, { id: story.id })

  const [author, setAuthor] = React.useState<IUserPreview>()

  const [userLiked, setUserLiked] = React.useState(false)

  const likeStory = async () => {
    if (!isAuthenticated) {
      ToastsHelper.warnActionNeedAuthentification()

      return
    }
    await simpleStoryService.likeStory(story.id, user!.id, authToken!)
    setUserLiked(true)
  }

  const removeLikeFromStory = async () => {
    if (!isAuthenticated) {
      ToastsHelper.warnActionNeedAuthentification()

      return
    }
    await simpleStoryService.removeLikeFromStory(story.id, user!.id, authToken!)
    setUserLiked(false)
  }

  React.useEffect(() => {
    const getUserLiked = async () => {
      const response = await simpleStoryService.getStoryLikedBy(
        story.id,
        user!.id,
        user!.id,
        authToken!,
      )

      setUserLiked(response.data)
    }
    const getAuthor = async () => {
      const response = await userService.getUserPreview(story.info.authorId)

      setAuthor(response.data)
    }

    getAuthor()
    if (isAuthenticated) {
      getUserLiked()
    }
  }, [])

  return (
    <div className={style["story-card"]}>
      <Link to={generatePath(AppRoutes.STORY, { id: story.id })} className={style["header"]}>
        <img src={story.info.image.url} className={style["img"]} alt={story.info.image.alt} />
        <div className={style["title"]}>
          {StringHelper.truncateTextWithEllipsis(story.info.title, 128)}
        </div>
        <div className={style["desc"]}>
          {StringHelper.truncateTextWithEllipsis(story.info.description, 196)}
        </div>
      </Link>
      <div className={style["footer"]}>
        <div className={style["card-actions"]}>
          <LikeButton isLiked={userLiked} like={likeStory} dislike={removeLikeFromStory} />
          <ShareButton url={storyUrl} />
        </div>
        <Link
          to={generatePath(AppRoutes.USER_PROFILE, { id: author?.id ?? "" })}
          className={style["user-link"]}
        >
          <img src={author?.avatar.url} className={style["user-avatar"]} alt={author?.avatar.alt} />
        </Link>
      </div>
    </div>
  )
}

export { StoryCard }
