import * as React from "react"
import { CircularProgress } from "@mui/material"

import style from "./style.module.scss"

function Loading() {
  return (
    <div className={style["loading"]}>
      <CircularProgress />
    </div>
  )
}

export { Loading }
