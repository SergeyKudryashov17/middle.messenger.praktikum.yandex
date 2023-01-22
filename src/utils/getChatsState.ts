import { IChat } from "../api/types";

type TChatsState = {
  selectedChat: number | undefined,
  chatState: IChat
}

export const getChatsState = (state): TChatsState => {
  return {
    selectedChat: state.selectedChat,
    chatState: state.chats
  }
};
