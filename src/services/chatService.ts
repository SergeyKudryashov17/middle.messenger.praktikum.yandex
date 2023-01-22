import ChatAPI from "../api/ChatAPI";
import store from "../core/Store";
import { FullUserData, IAdditParamUsersChat, IDeleteUser, IRequestChatUsers, IRequestNewChat } from "../api/types";
import { apiHasError } from "../utils/apiHasError";
import * as console from "console";

class ChatService {
  private api = new ChatAPI('/chats');

  public async getListChats() {
    try {
      const response = await this.api.getChats();
      store.set('chats', response);
    } catch (e) {
      alert('Произошла ошибка при получении чатов');
      store.set('chats', []);
    }
  }

  public async createChat(request: IRequestNewChat) {
    try {
      const response = await this.api.createChat(request);
      if (apiHasError(response)) {
        console.error(response.reason);
        throw Error(response.reason);
      }
      await this.getListChats();
    } catch (e) {
      alert('Произошла ошибка при создании чата');
    }
  }

  public async addUserToChat(request: IRequestChatUsers): Promise<void> {
    const response = await this.api.addUserToChat(request);
    if (apiHasError(response)) {
      alert(response.reason);
      throw Error(response.reason);
    } else {
      alert('Пользователь добавлен в чат');
    }
  }

  public async getChatsUsers(chatID: string, addParams: IAdditParamUsersChat = {}): Promise<FullUserData[] | null | undefined> {
    try {
      return await this.api.getChatUsers(chatID, addParams);
    } catch (e) {
      console.error(e);
      alert('Произошла ошибка при получении списка');
    }
  }

  public async deleteUserFromChat(userData: IDeleteUser): Promise<true | false | undefined>  {
    if (userData.role === 'admin') {
      alert('Пользователь является админом. Удаление невозможно');
      return false;
    }

    const currentChatID = store.getState().selectedChat.id;
    const request = {
      users: [userData.id],
      chatId: currentChatID
    }

    try {
      await this.api.deleteUserFromChat(request);
      return true;
    } catch (e) {
      console.error(e);
      alert('Произошла ошибка при удалении');
    }
  }
}

export default new ChatService();
