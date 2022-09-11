import { AxiosResponse } from 'axios'

import { ServiceBase } from './base/ServiceBase'
import { testData } from './test_data'

import { AppConfig } from '../config/AppConfig'
import {
  IAuthState,
  IStory,
  IStoryCreateRequest,
  IStoryPreview,
  IStoryUpdateRequest,
} from '../types'

class SimpleStoryService extends ServiceBase {
  constructor() {
    super({
      BaseUrl: AppConfig.API_BASE_URL,
      BasePath: '/story',
    })
  }

  public async getStoryById(id: string, authInfo: IAuthState): Promise<IStory> {
    // const response = await this.http.get<IStory>(`/${id}`, {
    // headers: { User: `${authInfo.user?.id}`, Authorization: `Bearer ${authInfo.authToken}` },
    // })

    const mock = testData.story

    return mock
  }

  public async getStoryUsingShareToken(shareToken: string, userId?: string): Promise<IStory> {
    // const response = await this.http.get<IStory>(this.EMPTY_PATH, {
    //   params: { shareToken, userId },
    // })

    const mock = testData.story

    return mock
  }

  public async getStoryPreviewById(id: string): Promise<IStoryPreview> {
    // const response = await this.http.get<IStoryPreview>(`/${id}/preview`)

    const mock = testData.storyPreview

    return mock
  }

  public async getPublicStoriesPreview(): Promise<IStoryPreview[]> {
    // const response = await this.http.get<IStoryPreview[]>('/public/preview')

    const mock = testData.storiesPreview

    return mock
  }

  public async getStoriesPreviewByUserId(authInfo: IAuthState): Promise<IStoryPreview[]> {
    // const response = await this.http.get<IStoryPreview[]>('/preview`', {
    // headers: { User: `${authInfo.user?.id}`, Authorization: `Bearer ${authInfo.authToken}` },
    // })

    const mock = testData.storiesPreview

    return mock
  }

  public async createStory(
    story: IStoryCreateRequest,
    authInfo: IAuthState,
  ): Promise<AxiosResponse> {
    const response = await this.http.post(this.EMPTY_PATH, story, {
      headers: { User: `${authInfo.user?.id}`, Authorization: `Bearer ${authInfo.authToken}` },
    })

    return response
  }

  public async updateStory(
    id: string,
    story: IStoryUpdateRequest,
    authInfo: IAuthState,
  ): Promise<AxiosResponse> {
    const response = await this.http.put(`/${id}`, story, {
      headers: { User: `${authInfo.user?.id}`, Authorization: `Bearer ${authInfo.authToken}` },
    })

    return response
  }

  public async deleteStoryById(id: string, authInfo: IAuthState): Promise<AxiosResponse> {
    const response = await this.http.delete(`/${id}`, {
      headers: { User: `${authInfo.user?.id}`, Authorization: `Bearer ${authInfo.authToken}` },
    })

    return response
  }

  public async getStoryLikedBy(
    id: string,
    likedByUserId: string,
    authInfo: IAuthState,
  ): Promise<boolean> {
    // const response = await this.http.get<boolean>(`/${id}/like`, {
    //   params: { likedByUserId },
    //   headers: { User: `${authInfo.user?.id}`, Authorization: `Bearer ${authInfo.authToken}` },
    // })

    const mock = Boolean(Math.round(Math.random()))

    return mock
    // return response.data
  }

  public async getAllStoryLikes(id: string, authInfo: IAuthState): Promise<AxiosResponse> {
    const response = await this.http.get(`/${id}/like`, {
      headers: { User: `${authInfo.user?.id}`, Authorization: `Bearer ${authInfo.authToken}` },
    })

    return response
  }

  public async likeStory(id: string, authInfo: IAuthState): Promise<void> {
    // const response = await this.http.post(`/${id}/like`, {
    // headers: { User: `${authInfo.user?.id}`, Authorization: `Bearer ${authInfo.authToken}` },
    // })
    // return response
  }

  public async removeLikeFromStory(id: string, authInfo: IAuthState): Promise<void> {
    // const response = await this.http.delete(`/${id}/like`, {
    // headers: { User: `${authInfo.user?.id}`, Authorization: `Bearer ${authInfo.authToken}` },
    // })
    // return response
  }

  public async addViewToStory(id: string, authInfo: IAuthState): Promise<void> {
    // const response = await this.http.post(`/${id}/view`, {
    // headers: { User: `${authInfo.user?.id}`, Authorization: `Bearer ${authInfo.authToken}` },
    // })
    // return response
  }
}

const simpleStoryService = new SimpleStoryService()

export { simpleStoryService }
