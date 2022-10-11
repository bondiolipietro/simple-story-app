import * as React from "react"
import { FaShareAlt } from "react-icons/fa"
import { IconButton, Tooltip } from "@mui/material"

import style from "./style.module.scss"

enum INTERACTIONS {
  COPY = "copy link",
  COPIED = "copied!",
}

type IShareButtonProps = {
  url: string
}

function ShareButton(props: IShareButtonProps) {
  const { url } = props

  const [tooltipText, setTooltipText] = React.useState<INTERACTIONS>(INTERACTIONS.COPY)

  const copyHrefToClipboard = () => {
    navigator.clipboard.writeText(url)
    setTooltipText(INTERACTIONS.COPIED)
  }

  return (
    <Tooltip title={tooltipText} arrow onOpen={() => setTooltipText(INTERACTIONS.COPY)} leaveTouchDelay={0}>
      <span className={style["share-btn"]}>
        <IconButton onClick={copyHrefToClipboard}>
          {/* <button type='button' className={style["share-btn"]} > */}
          <FaShareAlt />
          {/* </button> */}
        </IconButton>
      </span>
    </Tooltip>
  )
}

export { ShareButton }
