import { PersistPartial } from "redux-persist/lib/persistReducer"

declare global {
  type ResponseStatus = "success" | "error"

  type DefaultResponse<T = any> = {
    status: ResponseStatus
    message: string
    data: T
  }

  type DefaultNoDataResponse = DefaultResponse<null>

  //
  // File
  //

  type IFile = {
    _id: string
    title: string
    url: string
    key: string
    alt?: string
  }

  //
  // User
  //

  type IUserInfo = {
    _id: Types.ObjectId
    name: string
    nickname: string
    description?: string
    email: string
    secondaryEmail?: string
    avatar: IFile
    role: UserRole
    isVerified: boolean
  }

  type IPublicUserInfo = Pick<IUserInfo, "_id" | "name" | "nickname" | "description" | "email" | "avatar">

  type IUserIdObj = Pick<IUserInfo, "_id">

  type IUserCreateRequest = Pick<IUserInfo, "name" | "nickname" | "description" | "email"> & {
    password: string
  }

  type IUserUpdateRequest = Partial<Pick<IUserInfo, "name" | "nickname" | "description" | "secondaryEmail" | "avatar">>

  //
  // Story
  //

  type IStory = {
    _id: string
    frames: Array<IStoryFrame>
    info: IStoryInfo
    analytics: IStoryAnalytics
    createdAt: Date
    updatedAt: Date
  }

  type IStoryPreview = Pick<IStory, "_id" | "info" | "analytics" | "createdAt" | "updatedAt">

  type IStoryIdObj = Pick<IStory, "_id">

  type IStoryCreateRequest = Pick<IStory, "frames"> & {
    info: Omit<IStoryInfo, "author">
  }

  type IStoryUpdateRequest = IStoryCreateRequest

  type INote = {
    _id: string
    text: string
  }

  type IStoryFrame = {
    _id: string
    title: string
    paragraphs: Array<IStoryFrameParagraph>
    notes: Array<INote>
  }

  type IStoryFrameParagraph = {
    _id: string
    text: string
    audio?: IFile
    images: Array<IFile>
  }

  type IStoryInfo = {
    title: string
    description: string
    image: IFile
    author: string
    isPrivate: boolean
  }

  type IStoryAnalytics = {
    views: number
    likes: number
  }

  // ===
  // Create Story
  // ===

  type IMediaCreate = {
    file?: File
    alt: string
  }

  type IParagraphCreate = {
    text: string
    audio?: IMediaCreate
    images: Array<IMediaCreate>
  }

  type INoteCreate = {
    text: string
  }

  type IFrameCreate = {
    title: string
    paragraphs: Array<IParagraphCreate>
    notes: Array<INoteCreate>
  }

  type IStoryCreateForm = {
    frames: Array<IFrameCreate>
    info: {
      title: string
      description: string
      image: IMediaCreate
      private: boolean
    }
  }
}
