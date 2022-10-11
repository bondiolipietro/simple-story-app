import { AppConfig } from "@/config/app"

import { ServiceBase } from "./base/ServiceBase"

class SimpleStoryService extends ServiceBase {
  constructor() {
    super({
      BaseUrl: AppConfig.API_URL,
      BasePath: "/story",
      AdditionalConfig: {
        withCredentials: true,
      },
    })
  }

  public async shareStory(id: string): Promise<DefaultResponse<IStoryIdObj & { shareToken: string }>> {
    const response = await this.http.post(`/${id}/share`)

    return response.data
  }

  public async getStoryUsingShareToken(shareToken: string): Promise<DefaultResponse<IStory>> {
    const response = await this.http.get("/shared", {
      params: { shareToken },
    })

    return response.data
  }

  public async getStoryById(id: string): Promise<DefaultResponse<IStory>> {
    const response = await this.http.get(`/${id}`)

    return response.data
  }

  public async getStoryPreviewById(id: string): Promise<DefaultResponse<IStoryPreview>> {
    const response = await this.http.get(`/${id}/preview`)

    return response.data
  }

  public async getStoriesPreviews(query?: {
    skip?: number
    limit?: number
    userId?: string
  }): Promise<DefaultResponse<IStoryPreview[]>> {
    const response = await this.http.get("/public/preview", {
      params: { ...query },
    })

    return response.data
  }

  public async createStory(story: IStoryCreateRequest): Promise<DefaultResponse<IStoryIdObj>> {
    const response = await this.http.post(this.EMPTY_PATH, story)

    return response.data
  }

  public async updateStory(id: string, story: IStoryUpdateRequest): Promise<DefaultResponse<IStoryIdObj>> {
    const response = await this.http.put(`/${id}`, story)

    return response.data
  }

  public async deleteStoryById(id: string): Promise<DefaultResponse<IStoryIdObj>> {
    const response = await this.http.delete(`/${id}`)

    return response.data
  }

  public async likeStory(id: string): Promise<DefaultResponse<IStoryIdObj>> {
    const response = await this.http.post(`/${id}/like`)

    return response.data
  }

  public async dislikeStory(id: string): Promise<DefaultResponse<IStoryIdObj>> {
    const response = await this.http.post(`/${id}/dislike`)

    return response.data
  }

  public async viewStory(id: string): Promise<DefaultResponse<IStoryIdObj>> {
    const response = await this.http.post(`/${id}/view`)

    return response.data
  }
}

const simpleStoryService = new SimpleStoryService()

export { simpleStoryService }
