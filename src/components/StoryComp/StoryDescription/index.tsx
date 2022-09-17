import * as React from "react"

import style from "./style.module.scss"

import { IStoryFrame } from "../../../types"

type IStoryDescriptionProps = {
  frame: IStoryFrame
}

function StoryDescription(props: IStoryDescriptionProps) {
  const { frame } = props

  return (
    <div className={style["description"]}>
      {frame.notes.map((note) => (
        <div key={note.id} className={style["note"]}>
          {note.text}
        </div>
      ))}
    </div>
  )
}

export { StoryDescription }
