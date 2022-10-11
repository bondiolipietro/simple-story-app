import * as React from "react"

import style from "./style.module.scss"

type IStoryArtProps = {
  frame: IStoryFrame
}

function StoryArt(props: IStoryArtProps) {
  const { frame } = props

  return (
    <div className={style["art"]}>
      {frame.paragraphs.map((c) => c.images.map((i) => <img key={i._id} src={i.url} alt={i.alt} />))}
    </div>
  )
}

export { StoryArt }
