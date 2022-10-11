import { AppConfig } from "@/config/app"

import { ServiceBase } from "./base/ServiceBase"

class FileService extends ServiceBase {
  constructor() {
    super({
      BaseUrl: AppConfig.API_URL,
      BasePath: "/file",
      AdditionalConfig: {
        withCredentials: true,
      },
    })
  }

  public async uploadFile(file: File, alt?: string): Promise<DefaultResponse<IUserIdObj>> {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("alt", alt || "")

    const response = await this.http.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    return response.data
  }
}

const fileService = new FileService()

export { fileService }
