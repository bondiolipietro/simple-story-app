import axios, { AxiosError, AxiosInstance } from 'axios'

import { logger } from '../../utils/logger'

interface IConstructorProps {
  BaseUrl?: string
  BasePath?: string
}

function isAxiosError(value: any): value is AxiosError {
  return typeof value?.response === 'object'
}

/**
 * Um wrapper para chamadas http feitas usando a lib Axios.
 * @constructor
 * @param {string} BaseUrl - Url base do serviço. Ex: "https://apiexterna.com/"
 * @param {string} BasePath - Path base do serviço. Ex: "/api/v1/"
 */
abstract class ServiceBase {
  protected readonly http: AxiosInstance

  protected ACCEPT_HEADER_NAME = 'Accept'

  protected CONTENT_TYPE_HEADER_NAME = 'Content-Type'

  protected ACCEPTED_CONTENT_HEADER = 'application/json'

  protected EMPTY_PATH = ''

  protected REQUEST_EMPTY_BODY = {}

  public constructor({ BaseUrl = '', BasePath = '' }: IConstructorProps) {
    const serviceUrl = BaseUrl + BasePath

    this.http = axios.create({ baseURL: serviceUrl })

    // Adiciona os headers padrão dos requests
    this.http.defaults.headers.common[this.ACCEPT_HEADER_NAME] = this.ACCEPTED_CONTENT_HEADER
    this.http.defaults.headers.common[this.CONTENT_TYPE_HEADER_NAME] = this.ACCEPTED_CONTENT_HEADER

    // Adiciona os interceptors
    // Passa undefined para o handler "onFulfilled" para que o handler padrão seja utilizado
    this.http.interceptors.response.use(undefined, this.handleError)
  }

  protected handleError(error: unknown) {
    if (error instanceof Error) {
      if (isAxiosError(error)) {
        logger.error('Error config', error.config)
        if (error.response) {
          // A server respondeu o request com com um status code diferente de 2xx
          logger.error(error.response.status)
          logger.error(error.response.headers)
          throw error
        } else if (error.request) {
          // Quando o request foi feito mas nenhuma response foi recebida
          // `error.request` é uma instancia da classe XMLHttpRequest no browser
          logger.error(error.request)
          throw new Error(error as any)
        }
      } else {
        // Algum erro foi disparado ao tentar montar o request
        logger.error('Error', error.message)
        throw new Error(error.message)
      }
    }
    throw new Error(error as any)
  }
}

export { ServiceBase, isAxiosError }
