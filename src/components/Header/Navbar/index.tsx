import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import style from './style.module.scss'

import { AppRoutes } from '../../../constants/AppRoutes'
import { getAuth } from '../../../store/selectors'

function Navbar() {
  const authState = useSelector(getAuth)

  return (
    <nav className={style['navbar']}>
      {authState.isAuthenticated ? (
        <>
          <Link className={style['navbar__item']} to={AppRoutes.MY_STORIES}>
            My Stories
          </Link>
          <Link className={style['navbar__item']} to={AppRoutes.STORY_CREATE}>
            New Story
          </Link>
          <Link className={style['navbar__item']} to={AppRoutes.MY_PROFILE}>
            My Profile
          </Link>
        </>
      ) : (
        <Link className={style['navbar__item']} to={AppRoutes.LOGIN}>
          Login
        </Link>
      )}
    </nav>
  )
}

export { Navbar }
