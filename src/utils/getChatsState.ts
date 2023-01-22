import { IChat, IFullMessage, IShortDataChat, IState } from "../api/types";

type TChatsState = {
  selectedChat: IShortDataChat | undefined,
  chatState: IChat[],
  messages: Record<number, IFullMessage[]> | undefined
}

export const getChatsState = (state: IState): TChatsState => {
  return {
    selectedChat: state.selectedChat,
    chatState: state.chats,
    messages: state.messages
  }
};
