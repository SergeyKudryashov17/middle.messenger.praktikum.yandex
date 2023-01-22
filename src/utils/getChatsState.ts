import { IChat, IFullMessage, IShortDataChat, IState } from "../api/types";

type TChatsState = {
  selectedChat: IShortDataChat | undefined,
  chatState: IChat[] | undefined,
  messages: Record<number, IFullMessage[]> | undefined
}

export const getChatsState = (state: IState): TChatsState => {
  return {
    selectedChat: { ...state.selectedChat } as IShortDataChat,
    chatState: state.chats,
    messages: { ...state.messages }
  }
};
