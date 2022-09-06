import React from 'react'
import { Outlet } from 'react-router-dom'

import style from './style.module.scss'

import { Header } from '../Header'
import { Footer } from '../Footer'

function DefaultLayout() {
  return (
    <div className={style['home-layout']}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export { DefaultLayout }
