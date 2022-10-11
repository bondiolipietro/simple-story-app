import * as React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { RiLogoutBoxRLine } from "react-icons/ri"

import { AppRoutes } from "@/constants/AppRoutes"
import { getAuth } from "@/store/selectors"

import style from "./style.module.scss"

function Navbar() {
  const { isAuthenticated } = useSelector(getAuth)

  const authenticatedMenus = [
    {
      text: "New Story",
      path: AppRoutes.STORY_CREATE,
    },
    {
      text: "My Profile",
      path: AppRoutes.MY_PROFILE,
    },
    {
      text: <RiLogoutBoxRLine />,
      path: AppRoutes.LOGOUT,
    },
  ]

  const unauthenticatedMenus = [
    {
      text: "Signup",
      path: AppRoutes.SIGNUP,
    },
    {
      text: "Login",
      path: AppRoutes.LOGIN,
    },
  ]

  const currentMenuList = isAuthenticated ? authenticatedMenus : unauthenticatedMenus

  return (
    <nav className={style["navbar"]}>
      {currentMenuList.map((menu) => (
        <Link key={menu.path} className={style["navbar__item"]} to={menu.path}>
          {menu.text}
        </Link>
      ))}
    </nav>
  )
}

export { Navbar }
