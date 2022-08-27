export type IStory = {
  id: string;
  title: string;
  views: number;
  frames: Array<IStoryFrame>;
  info: {
    title: string;
    description: string;
    image: IImageContent;
    author: IUserPreview;
    private: boolean;
  };
  analytics: {
    views: number;
  };
};

export type IMediaContent = {
  id: string;
  title: string;
  url: string;
  alt: string;
};

export type IImageContent = IMediaContent;

export type IStoryFrame = {
  title: string;
  content: Array<IStoryFrameParagraph>;
  notes: Array<string>;
};

export type IStoryFrameParagraph = {
  content: string;
  audio: IStoryAudio;
  images: Array<IStoryImage>;
};

export type IStoryAudio = IMediaContent;

export type IStoryImage = IMediaContent & {
  size: ISize;
};

export enum ISize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export type IAuthInfo = {
  user: IUserInfo;
};

export type IUserInfo = {
  id: string;
  name: string;
  nickname: string;
  description?: string;
  email: string;
  secondaryEmail?: string;
  avatar: IUserAvatar;
};

export type IUserPreview = Pick<IUserInfo, "id" | "name" | "avatar">;

export type IUserAvatar = IMediaContent;

export type ILoginForm = {
  email: string;
  password: string;
};

export type ISignUpForm = Omit<
  IUserInfo,
  "id" | "description" | "secondaryEmail"
> & {
  password: string;
  confirmPassword: string;
};

export type IRecoverAccessForm = {
  email: string;
};
