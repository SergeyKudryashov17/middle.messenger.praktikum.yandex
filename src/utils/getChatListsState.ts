import { IChat, IState } from "../api/types";

type TChatListsState = {
  chatState?: IChat[]
}

export const getChatListsState = (state: IState): TChatListsState => {
  return {
    chatState: state.chats
  }
};
