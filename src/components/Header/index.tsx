import * as React from "react"
import { Link } from "react-router-dom"

import magicBookImg from "@/assets/img/magic-book.png"
import { Navbar } from "@/components/Header/Navbar"
import { AppRoutes } from "@/constants/AppRoutes"

import style from "./style.module.scss"

function Header() {
  return (
    <header className={style["header"]}>
      <Link to={AppRoutes.HOME} className={style["logo-link"]}>
        <img src={magicBookImg} className={style["logo-link__img"]} alt='Simple story logo.' />
      </Link>
      <Navbar />
    </header>
  )
}

export { Header }
