import Block from "../../core/Block";
import { FullUserData } from "../../api/types";
import Button from "../button/Button";
import ChatService from "../../services/chatService";

import "./userItem.css";

interface IUserItemProps extends FullUserData {
  button?: Button
}

export default class userItem extends Block {
  constructor(props: IUserItemProps) {
    props.button = new Button({
      className: 'user-item__button button_danger button_small',
      label: 'Удалить',
      events: {
        click: async ()=> {
          const response = await ChatService.deleteUserFromChat({
            id: this.props.id,
            role: this.props.role
          });
          if (response) {
            this.getContent()?.remove();
          }
        }
      }
    })

    super('div', { ...props });
  }

  render(): string {
    return `<div class="user-item" data-user-id="${this.props.id}" data-user-role="${this.props.role}">
              <div class="user-item__name">${this.props.first_name} ${this.props.second_name}</div>
              {{{ button }}}
            </div>`
  }
}
