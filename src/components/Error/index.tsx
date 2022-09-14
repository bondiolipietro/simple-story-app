import * as React from "react"
import { FiAlertTriangle } from "react-icons/fi"

import style from "./style.module.scss"

type IErrorProps = {
  message?: string
}

function Error(props: IErrorProps) {
  const { message = "Something went wrong" } = props

  return (
    <div className={style["error"]}>
      <FiAlertTriangle className={style["alert-icon"]} />
      <p className={style["error__message"]}>{message}</p>
    </div>
  )
}

export { Error }
