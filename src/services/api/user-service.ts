import { AppConfig } from "@/config/app"

import { ServiceBase } from "./base/ServiceBase"

class UserService extends ServiceBase {
  constructor() {
    super({
      BaseUrl: AppConfig.API_URL,
      BasePath: "/user",
      AdditionalConfig: {
        withCredentials: true,
      },
    })
  }

  public async register(user: IUserCreateRequest): Promise<DefaultResponse<IUserIdObj>> {
    const response = await this.http.post("/register", user)

    return response.data
  }

  public async verifyUserEmail(token: string, email: string): Promise<DefaultResponse<IUserIdObj>> {
    const response = await this.http.post("/verify-email", { token, email })

    return response.data
  }

  public async resendVerificationEmail(email: string): Promise<DefaultNoDataResponse> {
    const response = await this.http.post("/resend-verification-email", { email })

    return response.data
  }

  public async getUserById(id: string): Promise<DefaultResponse<IUserInfo>> {
    const response = await this.http.get(`/${id}`)

    return response.data
  }

  public async getUserPreviewById(id: string): Promise<DefaultResponse<IPublicUserInfo>> {
    const response = await this.http.get(`/${id}/preview`)

    return response.data
  }

  public async updateUser(id: string, user: IUserUpdateRequest): Promise<DefaultResponse<IUserIdObj>> {
    const response = await this.http.put(`/${id}`, user)

    return response.data
  }

  public async updateUserPassword(
    id: string,
    password: string,
    newPassword: string,
  ): Promise<DefaultResponse<IUserIdObj>> {
    const response = await this.http.put(`/${id}/password`, { password, newPassword })

    return response.data
  }

  public async deleteUser(id: string): Promise<DefaultResponse<IUserIdObj>> {
    const response = await this.http.delete(`/${id}`)

    return response.data
  }
}

const userService = new UserService()

export { userService }
