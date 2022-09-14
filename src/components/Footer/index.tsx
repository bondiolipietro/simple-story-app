import * as React from "react"
import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai"

import style from "./style.module.scss"

function Footer() {
  return (
    <footer className={style["footer"]}>
      Pietro Bondioli - All rights reserved &copy; 2022
      <div className={style["social-media"]}>
        <a
          href='https://github.com/bondiolipietro'
          className={style["social-media__link"]}
          target='_blank'
          rel='noreferrer'
        >
          <AiOutlineGithub />
        </a>
        <a
          href='https://www.linkedin.com/in/pietrobondioli/'
          className={style["social-media__link"]}
          target='_blank'
          rel='noreferrer'
        >
          <AiOutlineLinkedin />
        </a>
      </div>
    </footer>
  )
}

export { Footer }
