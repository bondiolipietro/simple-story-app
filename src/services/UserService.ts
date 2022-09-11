import { AxiosResponse } from 'axios'

import { ServiceBase } from './base/ServiceBase'
import { testData } from './test_data'

import { AppConfig } from '../config/AppConfig'
import {
  IAuthState,
  ILoginResponse,
  IUserCreateRequest,
  IUserInfo,
  IUserPreview,
  IUserUpdateRequest,
} from '../types'

class UserService extends ServiceBase {
  constructor() {
    super({
      BaseUrl: AppConfig.API_BASE_URL,
      BasePath: '/user',
    })
  }

  public async signUp(user: IUserCreateRequest): Promise<AxiosResponse> {
    const response = await this.http.post('/sign-up', user)

    return response
  }

  public async login(email: string, password: string): Promise<ILoginResponse> {
    // const response = await this.http.post<ILoginResponse>('/login', { email, password })

    const mock = testData.loginResponse

    return mock
  }

  public async logout(userId: string, authInfo: IAuthState): Promise<AxiosResponse> {
    const response = await this.http.post(
      '/logout',
      { userId },
      { headers: { User: `${authInfo.user?.id}`, Authorization: `Bearer ${authInfo.authToken}` } },
    )

    return response
  }

  public async recoverPassword(email: string): Promise<AxiosResponse> {
    const response = await this.http.post('/recover-password', { email })

    return response
  }

  public async getUserInfo(id: string, authInfo: IAuthState): Promise<IUserInfo> {
    // const response = await this.http.get<IUserInfo>(`/${id}/info`, {
    // headers: { User: `${authInfo.user?.id}`, Authorization: `Bearer ${authInfo.authToken}` },
    // })

    const mock = testData.user

    return mock
  }

  public async getUserPreview(id: string): Promise<IUserPreview> {
    // const response = await this.http.get<IUserPreview>(`/${id}/info/preview`)

    const mock = testData.userPreview

    return mock
    // return response.data
  }

  public async updateUserInfo(
    id: string,
    user: IUserUpdateRequest,
    authInfo: IAuthState,
  ): Promise<AxiosResponse> {
    const response = await this.http.put<IUserInfo>(`/${id}/info`, user, {
      headers: { User: `${authInfo.user?.id}`, Authorization: `Bearer ${authInfo.authToken}` },
    })

    return response
  }

  public async updateUserPassword(
    id: string,
    password: string,
    authInfo: IAuthState,
  ): Promise<AxiosResponse> {
    const response = await this.http.put<IUserInfo>(
      `/${id}/info/password`,
      { password },
      {
        headers: { User: `${authInfo.user?.id}`, Authorization: `Bearer ${authInfo.authToken}` },
      },
    )

    return response
  }

  public async deleteUser(id: string, authInfo: IAuthState): Promise<AxiosResponse> {
    const response = await this.http.delete<IUserInfo>(`/${id}`, {
      headers: { User: `${authInfo.user?.id}`, Authorization: `Bearer ${authInfo.authToken}` },
    })

    return response
  }
}

const userService = new UserService()

export { userService }
