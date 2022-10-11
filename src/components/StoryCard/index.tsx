import * as React from "react"
import { generatePath, Link } from "react-router-dom"
import { useSelector } from "react-redux"

import { AppRoutes } from "@/constants/AppRoutes"
import { ShareButton } from "@/components/ShareButton"
import { LikeButton } from "@/components/LikeButton"
import { getAuth } from "@/store/selectors"
import { userService } from "@/services/api/user-service"
import { WebAppHelper } from "@/utils/webapp-util"
import { StringHelper } from "@/utils/string-util"
import { ToastsHelper } from "@/utils/toast-util"
import { simpleStoryService } from "@/services/api/story-service"

import style from "./style.module.scss"

type IStoryCardProps = {
  story: IStoryPreview
}

function StoryCard(props: IStoryCardProps) {
  const { story } = props
  const { isAuthenticated } = useSelector(getAuth)
  const storyUrl = WebAppHelper.getHostName() + generatePath(AppRoutes.STORY, { id: story._id })

  const [author, setAuthor] = React.useState<IPublicUserInfo>()

  const [userLiked, setUserLiked] = React.useState(false)

  const likeStory = async () => {
    if (!isAuthenticated) {
      ToastsHelper.warnActionNeedAuthentification()

      return
    }
    await simpleStoryService.likeStory(story._id)
    setUserLiked(true)
  }

  const removeLikeFromStory = async () => {
    if (!isAuthenticated) {
      ToastsHelper.warnActionNeedAuthentification()

      return
    }
    await simpleStoryService.dislikeStory(story._id)
    setUserLiked(false)
  }

  React.useEffect(() => {
    // const getUserLiked = async () => {
    //   const response = await simpleStoryService.getStoryLikedBy(story.id, user!.id, user!.id, authToken!)

    //   setUserLiked(response.data)
    // }
    const getAuthor = async () => {
      const response = await userService.getUserPreviewById(story.info.author)

      setAuthor(response.data)
    }

    getAuthor()
    // if (isAuthenticated) {
    //   getUserLiked()
    // }
  }, [])

  return (
    <div className={style["story-card"]}>
      <Link to={generatePath(AppRoutes.STORY, { id: story._id })} className={style["header"]}>
        <img src={story.info.image.url} className={style["img"]} alt={story.info.image.alt} />
        <div className={style["title"]}>{StringHelper.truncateTextWithEllipsis(story.info.title, 128)}</div>
        <div className={style["desc"]}>{StringHelper.truncateTextWithEllipsis(story.info.description, 196)}</div>
      </Link>
      <div className={style["footer"]}>
        <div className={style["card-actions"]}>
          <LikeButton isLiked={userLiked} like={likeStory} dislike={removeLikeFromStory} />
          <ShareButton url={storyUrl} />
        </div>
        <Link to={generatePath(AppRoutes.USER_PROFILE, { id: author?._id ?? "" })} className={style["user-link"]}>
          <img src={author?.avatar.url} className={style["user-avatar"]} alt={author?.avatar.alt} />
        </Link>
      </div>
    </div>
  )
}

export { StoryCard }
