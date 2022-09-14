import * as React from "react"

import style from "./style.module.scss"

type IInputFieldProps = {
  name: string
  label: string
  error?: string
  additionalErrorCondition: boolean
  children: React.ReactNode
}

function InputField(props: IInputFieldProps) {
  const { name, label, error, additionalErrorCondition, children } = props

  return (
    <div className={style["field"]}>
      <label htmlFor={name}>{label}</label>
      <div className={style["input-container"]}>{children}</div>
      {error && additionalErrorCondition && <span className={style["error-msg"]}>{error}</span>}
    </div>
  )
}

export { InputField }
