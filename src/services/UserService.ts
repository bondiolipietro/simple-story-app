import { AxiosResponse } from 'axios'

import { ServiceBase } from './base/ServiceBase'

import { AppConfig } from '../config/AppConfig'
import { IUserCreateRequest, IUserInfo, IUserPreview, IUserUpdateRequest } from '../types'

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

  public async login(email: string, password: string): Promise<AxiosResponse> {
    const response = await this.http.post('/login', { email, password })

    return response
  }

  public async logout(userId: string, authToken: string): Promise<AxiosResponse> {
    const response = await this.http.post(
      '/logout',
      { userId },
      { headers: { Authorization: `Bearer ${authToken}` } },
    )

    return response
  }

  public async recoverPassword(email: string): Promise<AxiosResponse> {
    const response = await this.http.post('/recover-password', { email })

    return response
  }

  public async getUserInfo(id: string, authToken: string): Promise<AxiosResponse<IUserInfo>> {
    // const response = await this.http.get<IUserInfo>(`/${id}/info`, {
    //   headers: { Authorization: `Bearer ${authToken}` },
    // })

    const mock = {
      status: 200,
      statusText: '200',
      headers: {},
      config: {},
      data: {
        id: '1',
        name: 'Pietro Bondioli',
        nickname: 'pietro',
        description: 'description',
        email: 'pietrobondiolipessoal@gmail.com',
        secondaryEmail: 'pietrobondiolipessoal@gmail.com',
        avatar: {
          id: '1',
          title: 'avatar',
          url: 'https://cdn-icons-png.flaticon.com/512/4712/4712206.png',
          alt: 'avatar',
        },
      },
    }

    return mock
  }

  public async getUserPreview(id: string): Promise<AxiosResponse> {
    const response = await this.http.get<IUserPreview>(`/${id}/info/preview`)

    return response
  }

  public async updateUserInfo(
    id: string,
    authToken: string,
    user: IUserUpdateRequest,
  ): Promise<AxiosResponse> {
    const response = await this.http.put<IUserInfo>(`/${id}/info`, user, {
      headers: { Authorization: `Bearer ${authToken}` },
    })

    return response
  }

  public async updateUserPassword(
    id: string,
    authToken: string,
    password: string,
  ): Promise<AxiosResponse> {
    const response = await this.http.put<IUserInfo>(
      `/${id}/info/password`,
      { password },
      {
        headers: { Authorization: `Bearer ${authToken}` },
      },
    )

    return response
  }

  public async deleteUser(id: string, authToken: string): Promise<AxiosResponse> {
    const response = await this.http.delete<IUserInfo>(`/${id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    })

    return response
  }
}

const userService = new UserService()

export { userService }
