import * as React from "react"
import { Outlet } from "react-router-dom"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

import style from "./style.module.scss"

function DefaultLayout() {
  return (
    <div className={style["home-layout"]}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export { DefaultLayout }
