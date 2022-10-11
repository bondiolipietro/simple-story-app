import * as React from "react"

import style from "./style.module.scss"

type IStoryDescriptionProps = {
  frame: IStoryFrame
}

function StoryDescription(props: IStoryDescriptionProps) {
  const { frame } = props

  return (
    <div className={style["description"]}>
      {frame.notes.map((note) => (
        <div key={note._id} className={style["note"]}>
          {note.text}
        </div>
      ))}
    </div>
  )
}

export { StoryDescription }
