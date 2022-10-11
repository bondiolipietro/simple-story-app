import { AppConfig } from "@/config/app"

import { ServiceBase } from "./base/ServiceBase"

class AuthService extends ServiceBase {
  constructor() {
    super({
      BaseUrl: AppConfig.API_URL,
      BasePath: "/auth",
      AdditionalConfig: {
        withCredentials: true,
      },
    })
  }

  public async login(email: string, password: string): Promise<DefaultResponse<IUserIdObj>> {
    const response = await this.http.post("/login", { email, password })

    return response.data
  }

  public async recoverPassword(email: string, password: string, token: string): Promise<DefaultNoDataResponse> {
    const response = await this.http.post("/recover-password", { email, password, token })

    return response.data
  }

  public async sendRecoverPasswordEmail(email: string): Promise<DefaultNoDataResponse> {
    const response = await this.http.post("/recover-password/send-email", { email })

    return response.data
  }
}

const authService = new AuthService()

export { authService }
