import axios, { AxiosInstance } from 'axios'

interface IConstructorProps {
  BaseUrl?: string
  BasePath?: string
}

/**
 * wrapper for http requests made with axios
 * @constructor
 * @param {string} BaseUrl - Service base url. Ex: "https://apiexterna.com/"
 * @param {string} BasePath - Service base path. Ex: "/api/v1/"
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

    this.http.defaults.headers.common[this.ACCEPT_HEADER_NAME] = this.ACCEPTED_CONTENT_HEADER
    this.http.defaults.headers.common[this.CONTENT_TYPE_HEADER_NAME] = this.ACCEPTED_CONTENT_HEADER
  }
}

export { ServiceBase }
