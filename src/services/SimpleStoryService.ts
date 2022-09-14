import { AxiosResponse } from "axios"

import { ServiceBase } from "./base/ServiceBase"
import { createTestResponse, testData } from "./test_data"

import { AppConfig } from "../config/AppConfig"
import {
  IDefaultResponse,
  IStory,
  IStoryCreateRequest,
  IStoryPreview,
  IStoryUpdateRequest,
  IUserPreview,
} from "../types"

class SimpleStoryService extends ServiceBase {
  constructor() {
    super({
      BaseUrl: AppConfig.API_BASE_URL,
      BasePath: "/story",
    })
  }

  public async getStoryById(
    id: string,
    loggedUserId: string,
    authToken: string,
  ): Promise<IDefaultResponse<IStory>> {
    // const response = await this.http.get(`/${id}`, {
    // headers: { User: `${loggedUserId}`, Authorization: `Bearer ${authToken}` },
    // })

    const mock = createTestResponse(testData.story)

    return mock
  }

  public async getStoryUsingShareToken(
    shareToken: string,
    userId?: string,
  ): Promise<IDefaultResponse<IStory>> {
    // const response = await this.http.get(this.EMPTY_PATH, {
    //   params: { shareToken, userId },
    // })

    const mock = createTestResponse(testData.story)

    return mock
  }

  public async getStoryPreviewById(id: string): Promise<IDefaultResponse<IStoryPreview>> {
    // const response = await this.http.get(`/${id}/preview`)

    const mock = createTestResponse(testData.storyPreview)

    return mock
  }

  public async getPublicStoriesPreview(): Promise<IDefaultResponse<IStoryPreview[]>> {
    // const response = await this.http.get('/public/preview')

    const mock = createTestResponse(testData.storiesPreview)

    return mock
  }

  public async getStoriesPreviewByUserId(
    userId: string,
    loggedUserId: string,
    authToken: string,
  ): Promise<IDefaultResponse<IStoryPreview[]>> {
    // const response = await this.http.get('/preview`', {
    // params: { userId },
    // headers: { User: `${loggedUserId}`, Authorization: `Bearer ${authToken}` },
    // })

    const mock = createTestResponse(testData.storiesPreview)

    return mock
  }

  public async createStory(
    story: IStoryCreateRequest,
    loggedUserId: string,
    authToken: string,
  ): Promise<IDefaultResponse<Pick<IStory, "id">>> {
    const response = await this.http.post(this.EMPTY_PATH, story, {
      headers: { User: `${loggedUserId}`, Authorization: `Bearer ${authToken}` },
    })

    return response.data
  }

  public async updateStory(
    id: string,
    story: IStoryUpdateRequest,
    loggedUserId: string,
    authToken: string,
  ): Promise<IDefaultResponse<Pick<IStory, "id">>> {
    const response = await this.http.put(`/${id}`, story, {
      headers: { User: `${loggedUserId}`, Authorization: `Bearer ${authToken}` },
    })

    return response.data
  }

  public async deleteStoryById(
    id: string,
    loggedUserId: string,
    authToken: string,
  ): Promise<IDefaultResponse<Pick<IStory, "id">>> {
    const response = await this.http.delete(`/${id}`, {
      headers: { User: `${loggedUserId}`, Authorization: `Bearer ${authToken}` },
    })

    return response.data
  }

  public async getStoryLikedBy(
    id: string,
    likedByUserId: string,
    loggedUserId: string,
    authToken: string,
  ): Promise<IDefaultResponse<boolean>> {
    // const response = await this.http.get(`/${id}/like`, {
    //   params: { likedByUserId },
    //   headers: { User: `${loggedUserId}`, Authorization: `Bearer ${authToken}` },
    // })

    const mock = createTestResponse(Boolean(Math.round(Math.random())))

    return mock
    // return response.data
  }

  public async getAllStoryLikes(
    id: string,
    loggedUserId: string,
    authToken: string,
  ): Promise<IDefaultResponse<Pick<IUserPreview, "id">>> {
    const response = await this.http.get(`/${id}/like`, {
      headers: { User: `${loggedUserId}`, Authorization: `Bearer ${authToken}` },
    })

    return response.data
  }

  public async likeStory(id: string, loggedUserId: string, authToken: string): Promise<void> {
    // const response = await this.http.post(`/${id}/like`, {
    // headers: { User: `${loggedUserId}`, Authorization: `Bearer ${authToken}` },
    // })
    // return response.data
  }

  public async removeLikeFromStory(
    id: string,
    loggedUserId: string,
    authToken: string,
  ): Promise<void> {
    // const response = await this.http.delete(`/${id}/dislike`, {
    // headers: { User: `${loggedUserId}`, Authorization: `Bearer ${authToken}` },
    // })
    // return response.data
  }

  public async addViewToStory(id: string, loggedUserId: string, authToken: string): Promise<void> {
    // const response = await this.http.post(`/${id}/view`, {
    // headers: { User: `${loggedUserId}`, Authorization: `Bearer ${authToken}` },
    // })
    // return response.data
  }
}

const simpleStoryService = new SimpleStoryService()

export { simpleStoryService }
