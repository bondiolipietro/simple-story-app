import React from 'react'
import { Link } from 'react-router-dom'

import { Navbar } from './Navbar'
import style from './style.module.scss'

import { AppRoutes } from '../../constants/AppRoutes'
import magicBookImg from '../../assets/img/magic-book.png'

function Header() {
  return (
    <header className={style['header']}>
      <Link to={AppRoutes.HOME} className={style['logo-link']}>
        <img src={magicBookImg} className={style['logo-link__img']} alt='Simple story logo.' />
      </Link>
      <Navbar />
    </header>
  )
}

export { Header }
