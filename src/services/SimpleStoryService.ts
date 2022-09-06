import { AxiosResponse } from 'axios'

import { ServiceBase } from './base/ServiceBase'
import { testData } from './test_data'

import { AppConfig } from '../config/AppConfig'
import { IStory, IStoryCreateRequest, IStoryPreview, IStoryUpdateRequest } from '../types'

class SimpleStoryService extends ServiceBase {
  constructor() {
    super({
      BaseUrl: AppConfig.API_BASE_URL,
      BasePath: '/story',
    })
  }

  public async getStoryById(
    id: string,
    userId: string,
    authToken: string,
  ): Promise<AxiosResponse<IStory>> {
    // const response = await this.http.get<IStory>(`/${id}`, {
    //   params: { userId },
    //   headers: { Authorization: `Bearer ${authToken}` },
    // })

    const mock = testData.story

    return mock
  }

  public async getStoryUsingShareToken(
    shareToken: string,
    userId?: string,
  ): Promise<AxiosResponse<IStory>> {
    // const response = await this.http.get<IStory>(this.EMPTY_PATH, {
    //   params: { shareToken, userId },
    // })

    const mock = testData.story

    return mock
  }

  public async getStoryPreviewById(id: string): Promise<AxiosResponse<IStoryPreview>> {
    // const response = await this.http.get<IStoryPreview>(`/${id}/preview`)

    const mock = testData.storyPreview

    return mock
  }

  public async getPublicStoriesPreview(): Promise<AxiosResponse<IStoryPreview[]>> {
    // const response = await this.http.get<IStoryPreview[]>('/public/preview')

    const mock = testData.storiesPreview

    return mock
  }

  public async getStoriesPreviewByUserId(
    userId: string,
    authToken: string,
  ): Promise<AxiosResponse<IStoryPreview[]>> {
    // const response = await this.http.get<IStoryPreview[]>('/preview`', {
    //   params: { userId },
    //   headers: { Authorization: `Bearer ${authToken}` },
    // })

    const mock = testData.storiesPreview

    return mock
  }

  public async createStory(
    userId: string,
    authToken: string,
    story: IStoryCreateRequest,
  ): Promise<AxiosResponse> {
    const response = await this.http.post(this.EMPTY_PATH, story, {
      params: { userId },
      headers: { Authorization: `Bearer ${authToken}` },
    })

    return response
  }

  public async updateStory(
    id: string,
    userId: string,
    authToken: string,
    story: IStoryUpdateRequest,
  ): Promise<AxiosResponse> {
    const response = await this.http.put(`/${id}`, story, {
      params: { userId },
      headers: { Authorization: `Bearer ${authToken}` },
    })

    return response
  }

  public async deleteStoryById(
    id: string,
    userId: string,
    authToken: string,
  ): Promise<AxiosResponse> {
    const response = await this.http.delete(`/${id}`, {
      params: { userId },
      headers: { Authorization: `Bearer ${authToken}` },
    })

    return response
  }
}

const simpleStoryService = new SimpleStoryService()

export { simpleStoryService }
