import Block from '../../core/Block';
import Badge from "../badge/Badge";
import store from "../../core/Store";

import './dialogItem.css';
import { IChat, IShortDataChat } from "../../api/types";

interface IDialogItemProps extends IChat {
  unreadMessageCounter?: Badge | null,
  events?: Record<string, Function>
}

export default class DialogItem extends Block {
  unreadMessageCounter: Block | string;

  constructor(props: IDialogItemProps) {
    props.unreadMessageCounter = (props.unread_count)
      ? new Badge({
        value: props.unread_count
      }) : null;

    props.events = {
      click: () => {
        const selectedChat: IShortDataChat = {
          id: props.id,
          title: props.title,
          avatar: props.avatar
        };
        console.log('new selected chat', selectedChat);
        store.set('selectedChat', selectedChat);
      }
    }

    super("li", {...props});
  }

  render(): string {
    // const messageAuthorLogin = this.props.last_message.user.login;
    const isMyMessage: Boolean = false;

    return `
        <li class="dialog-list__item" data-chat-id="${this.props.id}">
            <div class="dialog">
                <div class="dialog__interlocutor-photo"></div>
                <div class="dialog__title">
                    <div class="dialog__interlocutor-name">${this.props.title}</div>
                    <div class="dialog__time">${this.props.last_message?.time || ""}</div>
                </div>
                <div class="dialog__message-preview">
                    ${ (isMyMessage) ? 'Вы' : '' }
                    ${this.props.last_message?.content || "Пусто"}
                </div>
                <div class="dialog__unread-badge">
                    {{{ unreadMessageCounter }}}
                </div>
            </div>
        </li>
    `;
  }
}
