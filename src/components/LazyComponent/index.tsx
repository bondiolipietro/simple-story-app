import React from 'react'
import { CircularProgress } from '@mui/material'
import { toast } from 'react-toastify'

import style from './style.module.scss'

import { Error } from '../Error'
import { Loading } from '../Loading'
import { IDefaultErrorResponse } from '../../types'

type ILazyComponentProps = {
  isLoading: boolean
  data?: unknown
  noDataMessage?: string
  error: IDefaultErrorResponse | null
  children: React.ReactNode
}

function LazyComponent(props: ILazyComponentProps) {
  const { isLoading, data, noDataMessage, error, children } = props

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error.message} />
  }

  if (!data) {
    return <Error message={noDataMessage} />
  }

  return <>{children}</>
}

export { LazyComponent }
