import * as React from "react"

import style from "./style.module.scss"

type ISectionContainerProps = {
  title?: string
  children: React.ReactNode
}

function SectionContainer(props: ISectionContainerProps) {
  const { title, children } = props

  return (
    <section className={style["section-container"]}>
      {title && <div className={style["section-container__title"]}>{title}</div>}
      {children}
    </section>
  )
}

export { SectionContainer }
