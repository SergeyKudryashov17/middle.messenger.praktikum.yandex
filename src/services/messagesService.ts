import ChatService from "../services/chatService";
import store from "../core/Store";
import WSTransport, { SocketEvents } from "../core/WSTransport";
import { IFullMessage } from "../api/types";

class MessagesService {
  private transports: Record<number, WSTransport> = {};

  async connect(chatID: number ) {
    if (this.transports[chatID]) {
      return;
    }

    const token = await ChatService.getChatToken(chatID);
    const currenntUserID = store.getState().user?.id;

    if (currenntUserID === undefined) {
      throw new Error('Отсутствует ID текущего пользователя');
    }

    const url = `wss://ya-praktikum.tech/ws/chats/${currenntUserID}/${chatID}/${token}`;
    const transport = new WSTransport(url);
    await transport.connect();

    transport.on(SocketEvents.Message, this.onMessageReceived.bind(this, chatID));
    transport.on(SocketEvents.Close, this.onConnectionClosed.bind(this, chatID));

    this.transports[chatID] = transport;
    this.fetchOldMessages(chatID);
  }

  onConnectionClosed(chatID: number) {
    delete this.transports[chatID];
  }

  onMessageReceived(chatID: number, message: IFullMessage | IFullMessage[]) {
    let type: string;
    if (Array.isArray(message)) {
      type = 'messages';
    } else {
      type = message.type;
    }

    const messagesState = store.getState().messages;
    const oldMessages = messagesState && messagesState[chatID] ? messagesState[chatID] : [];

    switch (type) {
      case 'message':
        store.set(`messages.${chatID}`, [...oldMessages, message]);
        break;
      case 'messages':
        store.set(`messages.${chatID}`, [...oldMessages, ...(message as IFullMessage[] )]);
        break;
    }

    store.set(`messages.${chatID}`, message);
  }

  async fetchOldMessages(chatID: number) {
    const transport = this.transports[chatID];

    if (!transport) {
      await this.connect(chatID);
    }

    transport.send({
      type: 'get old',
      content: '0'
    });
  }

  async sendMessage(chatID: number, content: string) {
    const transport = this.transports[chatID];

    if (!transport) {
      await this.connect(chatID);
    }

    transport.send({
      type: 'message',
      content
    });
  }
}

export default new MessagesService();
