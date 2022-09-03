import { AxiosResponse } from 'axios'

import { ServiceBase } from './base/ServiceBase'

import { AppConfig } from '../config/AppConfig'
import { ISize, IStory, IStoryCreateRequest, IStoryPreview, IStoryUpdateRequest } from '../types'

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

    const mock = {
      status: 200,
      statusText: '200',
      headers: {},
      config: {},
      data: {
        id: '1',
        frames: [
          {
            title: 'frame 1',
            content: [
              {
                content:
                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
                images: [
                  {
                    id: '1',
                    title: 'img titulo',
                    url: 'https://cptstatic.s3.amazonaws.com/imagens/enviadas/materias/materia16043/caracteristicas-cavalos-saudaveis-artigos-cursos-cpt.jpg',
                    alt: '',
                    size: ISize.MEDIUM,
                  },
                ],
              },
            ],
            notes: ['note 1', 'note 2'],
          },
          {
            title: 'frame 2',
            content: [
              {
                content:
                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the ',
                images: [
                  {
                    id: '1',
                    title: 'img titulo',
                    url: 'https://super.abril.com.br/wp-content/uploads/2022/07/SI_441_ORCL_potencia_site.jpg',
                    alt: '',
                    size: ISize.MEDIUM,
                  },
                ],
              },
            ],
            notes: ['note 1', 'note 2'],
          },
        ],
        info: {
          title: 'story 1',
          description: 'description',
          image: {
            id: '1',
            title: 'story preview image',
            url: 'https://images.unsplash.com/photo-1662103185262-b0b11b0f3008?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
            alt: 'cavalo',
          },
          authorId: '1',
          private: false,
        },
        analytics: {
          views: 1,
        },
      },
    }

    return mock
  }

  public async getStoryUsingShareToken(
    shareToken: string,
    userId?: string,
  ): Promise<AxiosResponse<IStory>> {
    const response = await this.http.get<IStory>(this.EMPTY_PATH, {
      params: { shareToken, userId },
    })

    return response
  }

  public async getStoryPreviewById(id: string): Promise<AxiosResponse<IStoryPreview>> {
    const response = await this.http.get<IStoryPreview>(`/${id}/preview`)

    return response
  }

  public async getPublicStoriesPreview(): Promise<AxiosResponse<IStoryPreview[]>> {
    // const response = await this.http.get<IStoryPreview[]>('/public/preview')

    const mock = {
      status: 200,
      statusText: '200',
      headers: {},
      config: {},
      data: [
        {
          id: '1',
          info: {
            title: 'story 1',
            description: 'description',
            image: {
              id: '1',
              title: 'story preview image',
              url: 'https://images.unsplash.com/photo-1662103185262-b0b11b0f3008?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
              alt: 'cavalo',
            },
            authorId: '1',
            private: false,
          },
          analytics: {
            views: 1,
          },
        },
      ],
    }

    return mock
  }

  public async getStoriesPreviewByUserId(
    userId: string,
    authToken: string,
  ): Promise<AxiosResponse<IStoryPreview[]>> {
    const response = await this.http.get<IStoryPreview[]>('/preview`', {
      params: { userId },
      headers: { Authorization: `Bearer ${authToken}` },
    })

    return response
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
