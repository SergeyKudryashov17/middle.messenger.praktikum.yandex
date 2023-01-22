import { IChat, IFullMessage, IShortDataChat, IState, UserData } from "../api/types";

type TMainState = {
  selectedChat: IShortDataChat | undefined,
  chatState: IChat[] | undefined,
  messages: Record<number, IFullMessage[]> | undefined,
  user: UserData | undefined
}

export const getMainState = (state: IState): TMainState => {
  return {
    selectedChat: { ...state.selectedChat } as IShortDataChat,
    chatState: state.chats,
    messages: { ...state.messages },
    user: { ...state.user } as UserData
  }
};
