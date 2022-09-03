import { PersistPartial } from 'redux-persist/lib/persistReducer'

export type IRootState = {
  authState: IAuthState & PersistPartial
}

export type IAuthState = {
  user?: IUserInfo
  authToken?: string
  isAuthenticated: boolean
  error?: Error
}

export type IStory = {
  id: string
  frames: Array<IStoryFrame>
  info: {
    title: string
    description: string
    image: IImageContent
    authorId: string
    private: boolean
  }
  analytics: {
    views: number
  }
}

export type IStoryPreview = Pick<IStory, 'id' | 'info' | 'analytics'>

export type IStoryCreateRequest = Pick<IStory, 'frames' | 'info'>

export type IStoryUpdateRequest = Partial<IStoryCreateRequest>

export type IMediaContent = {
  id: string
  title: string
  url: string
  alt: string
}

export type IImageContent = IMediaContent

export type IStoryFrame = {
  title: string
  content: Array<IStoryFrameParagraph>
  notes: Array<string>
}

export type IStoryFrameParagraph = {
  content: string
  audio?: IStoryAudio
  images: Array<IStoryImage>
}

export type IStoryAudio = IMediaContent

export type IStoryImage = IMediaContent & {
  size: ISize
}

export enum ISize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export type IAuthInfo = {
  user: IUserInfo
}

export type IUserInfo = {
  id: string
  name: string
  nickname: string
  description?: string
  email: string
  secondaryEmail?: string
  avatar: IUserAvatar
}

export type IUserPreview = Pick<IUserInfo, 'id' | 'name' | 'nickname' | 'description' | 'avatar'>

export type IUserAvatar = IMediaContent

export type ILoginForm = {
  email: string
  password: string
}

export type IUserCreateRequest = Omit<IUserInfo, 'id' | 'description' | 'secondaryEmail'> & {
  password: string
  confirmPassword: string
}

export type IUserUpdateRequest = Partial<IUserInfo>
