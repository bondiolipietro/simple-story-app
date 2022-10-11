import * as React from "react"

import { Error } from "@/components/Error"
import { Loading } from "@/components/Loading"
import { ErrorHelper } from "@/utils/error-util"

type ILazyComponentProps = {
  isLoading: boolean
  data?: unknown
  noDataMessage?: string
  error: unknown
  customErrorMessage?: string
  children: React.ReactNode
}

function LazyComponent(props: ILazyComponentProps) {
  const { isLoading, data, noDataMessage, error, customErrorMessage, children } = props

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    const errorMessage = customErrorMessage || ErrorHelper.getErrorMessage(error)

    return <Error message={errorMessage} />
  }

  if (!data) {
    return <Error message={noDataMessage} />
  }

  return <>{children}</>
}

export { LazyComponent }
