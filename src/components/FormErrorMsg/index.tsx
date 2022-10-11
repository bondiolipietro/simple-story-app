import * as React from "react"

import style from "./style.module.scss"

type IFormErrorMsgProps = {
  errorMessage: string
}

function FormErrorMsg(props: IFormErrorMsgProps) {
  const { errorMessage } = props

  return <span className={style["form-error-msg"]}>{errorMessage}</span>
}

export { FormErrorMsg }
