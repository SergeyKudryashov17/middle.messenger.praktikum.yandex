import Block from "../../core/Block";
import Badge from "../badge/Badge";
import store from "../../core/Store";

import getShortDate from "../../utils/getShortDate";
import { IChat, IShortDataChat } from "../../api/types";

import "./dialogItem.css";

interface IDialogItemProps extends IChat {
    unreadMessageCounter?: Badge | null;
    events?: Record<string, Function>;
}

export default class DialogItem extends Block {
    unreadMessageCounter: Block | string;

    constructor(props: IDialogItemProps) {
        props.unreadMessageCounter = props.unread_count
            ? new Badge({
                  value: props.unread_count,
              })
            : null;

        props.events = {
            click: () => {
                const selectedChat: IShortDataChat = {
                    id: props.id,
                    title: props.title,
                    avatar: props.avatar,
                };
                store.set("selectedChat", selectedChat);
            },
        };

        super("li", { ...props });
    }

    render(): string {
        const time = this.props.last_message?.time ? getShortDate(this.props.last_message?.time) : "";

        return `
        <li class="dialog-list__item" data-chat-id="${this.props.id}">
            <div class="dialog">
                <div class="dialog__interlocutor-photo"></div>
                <div class="dialog__title">
                    <div class="dialog__interlocutor-name">${this.props.title}</div>
                    <div class="dialog__time">${time}</div>
                </div>
                <div class="dialog__message-preview">
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
