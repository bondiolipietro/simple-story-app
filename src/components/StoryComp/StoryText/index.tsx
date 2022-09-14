import * as React from "react"
import { TypeAnimation } from "react-type-animation"

import style from "./style.module.scss"

import { IStoryFrame } from "../../../types"

type IStoryTextProps = {
  frame: IStoryFrame
}

function StoryText(props: IStoryTextProps) {
  const { frame } = props

  return (
    <div className={style["text"]}>
      <TypeAnimation sequence={frame.content.map((c) => c.content)} speed={20} />
    </div>
  )
}

export { StoryText }
