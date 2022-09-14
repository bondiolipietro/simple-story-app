import { AxiosResponse } from "axios"

import { ServiceBase } from "./base/ServiceBase"
import { createTestResponse, testData } from "./test_data"

import { AppConfig } from "../config/AppConfig"
import {
  IDefaultNoDataResponse,
  IDefaultResponse,
  ILoginResponse,
  IUserCreateRequest,
  IUserInfo,
  IUserPreview,
  IUserUpdateRequest,
} from "../types"

class UserService extends ServiceBase {
  constructor() {
    super({
      BaseUrl: AppConfig.API_BASE_URL,
      BasePath: "/user",
    })
  }

  public async signUp(user: IUserCreateRequest): Promise<IDefaultResponse<ILoginResponse>> {
    // const response = await this.http.post("/sign-up", user)

    const mock = createTestResponse(testData.loginResponse)

    return mock
    // return response.data
  }

  public async login(email: string, password: string): Promise<IDefaultResponse<ILoginResponse>> {
    // const response = await this.http.post('/login', { email, password })

    const mock = createTestResponse(testData.loginResponse)

    return mock
    // return response.data
  }

  public async logout(loggedUserId: string, authToken: string): Promise<IDefaultNoDataResponse> {
    // const response = await this.http.post(
    //   "/logout",
    //   { userId },
    //   { headers: { User: `${loggedUserId}`, Authorization: `Bearer ${authToken}` } },
    // )

    const mock = createTestResponse(null)

    return mock
    // return response.data
  }

  public async recoverPassword(email: string): Promise<IDefaultNoDataResponse> {
    // const response = await this.http.post('/recover-password', { email })

    const mock = createTestResponse(null)

    return mock
    // return response.data
  }

  public async getUserInfo(
    id: string,
    loggedUserId: string,
    authToken: string,
  ): Promise<IDefaultResponse<IUserInfo>> {
    // const response = await this.http.get(`/${id}/info`, {
    // headers: { User: `${loggedUserId}`, Authorization: `Bearer ${authToken}` },
    // })

    const mock = createTestResponse(testData.user)

    return mock
  }

  public async getUserPreview(id: string): Promise<IDefaultResponse<IUserPreview>> {
    // const response = await this.http.get(`/${id}/info/preview`)

    const mock = createTestResponse(testData.userPreview)

    return mock
    // return response.data
  }

  public async updateUserInfo(
    id: string,
    user: IUserUpdateRequest,
    loggedUserId: string,
    authToken: string,
  ): Promise<IDefaultResponse<Pick<IUserInfo, "id">>> {
    const response = await this.http.put(`/${id}/info`, user, {
      headers: { User: `${loggedUserId}`, Authorization: `Bearer ${authToken}` },
    })

    return response.data
  }

  public async updateUserPassword(
    id: string,
    password: string,
    loggedUserId: string,
    authToken: string,
  ): Promise<IDefaultResponse<Pick<IUserInfo, "id">>> {
    const response = await this.http.put(
      `/${id}/info/password`,
      { password },
      {
        headers: { User: `${loggedUserId}`, Authorization: `Bearer ${authToken}` },
      },
    )

    return response.data
  }

  public async deleteUser(
    id: string,
    loggedUserId: string,
    authToken: string,
  ): Promise<IDefaultResponse<Pick<IUserInfo, "id">>> {
    const response = await this.http.delete(`/${id}`, {
      headers: { User: `${loggedUserId}`, Authorization: `Bearer ${authToken}` },
    })

    return response.data
  }
}

const userService = new UserService()

export { userService }
