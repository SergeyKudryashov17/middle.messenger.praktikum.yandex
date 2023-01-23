import ChatAPI from "../api/ChatAPI";
import store from "../core/Store";
import MessageService from "../services/messagesService";
import {
  FullUserData,
  IAdditParamUsersChat,
  IChatID,
  IDeleteUser,
  IRequestChatUsers,
  IRequestNewChat
} from "../api/types";
import { apiHasError } from "../utils/apiHasError";

class ChatService {
  private api = new ChatAPI('/chats');

  public async getListChats() {
    try {
      const response = await this.api.getChats();

      const promises = response?.map(chat => MessageService.connect(chat.id));
      if (promises !== undefined) {
        await Promise.all(promises);
      }

      store.set('chats', response);
    } catch (e) {
      console.error(e);
      alert('Произошла ошибка при получении чатов');
      store.set('chats', []);
    }
  }

  public async createChat(request: IRequestNewChat): Promise<void> {
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

    const currentChatID = store.getState()?.selectedChat?.id;
    const request: IRequestChatUsers = {
      users: [userData.id],
      chatId: currentChatID as number
    }

    try {
      await this.api.deleteUserFromChat(request);
      return true;
    } catch (e) {
      console.error(e);
      alert('Произошла ошибка при удалении');
    }
  }

  public async getChatToken(chatID: number): Promise<string | null | undefined> {
    const request: IChatID = {
      id: chatID
    }

    try {
      const response = await this.api.getChatToken(request);
      if (apiHasError(response)) {
        console.error(response.reason);
        throw Error(response.reason);
      }

      return response?.token;
    } catch (e) {
      alert('Произошла ошибка при получении токена чата');
    }
  }
}

export default new ChatService();
