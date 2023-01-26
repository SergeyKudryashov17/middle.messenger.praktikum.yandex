export interface IState {
  user?: UserData,
  selectedChat?: IShortDataChat,
  isLoading?: boolean,
  messages?: Record<number, IFullMessage[]>,
  chats?: IChat[]
}

export type APIError = {
  reason: string;
};

export interface IProfileData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface SigninData {
  login: string;
  password: string;
}

export interface UserData {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
  avatar: string
}

export interface FullUserData extends UserData {
  role: string
}

export interface IPasswordData {
  oldPassword: string,
  newPassword: string
}

export interface IRequestSearchUser {
  login: string
}

export interface IRequestChat {
  offset: number,
  limit: number,
  title: string
}

export interface IAdditParamUsersChat {
  offset?: number,
  limit?: number,
  name?: string,
  email?: string
}

export interface IChatID {
  id: number
}

export interface IRequestChatUsers {
  users: number[],
  chatId: number
}

export interface IDeleteUser {
  id: number,
  role: string
}

export interface IResponseDeleteChat {
  userId: number,
  result: IShortDataChat
}

export interface ITokenChat {
  token: string
}

export interface IShortDataChat {
  id: number,
  title: string,
  avatar: string
}

export interface IChat extends IShortDataChat {
  created_by: number,
  unread_count: number,
  last_message: IMessage
}

export interface IMessage {
  user: IProfileData,
  time: string,
  content: string
}

export interface IRequestNewChat {
  title: string
}

export interface IFullMessage {
  chat_id: number,
  time: string,
  type: string,
  user_id: string,
  content: string
}
