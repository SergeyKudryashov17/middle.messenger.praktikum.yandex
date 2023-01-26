import Button from "../button/Button";
import Field from "../field/Field";
import Form from "../form/Form";
import Block from "../../core/Block";

import '../modal/modal.css';
import { FullUserData, IChat, IShortDataChat } from "../../api/types";
import isEqual from "../../utils/isEqual";
import ListUsers from "../listUsers";

type ModalDeleteUsersProps = {
  modalID: string,
  title?: string,
  field?: Field,
  form?: Form,
  buttonOk?: Button,
  buttonCancel?: Button,
  selectedChat?: IShortDataChat,
  chatState?: IChat,
  listChatUsers?: FullUserData[],
  listUsersComponent?: ListUsers
}

export default class ModalDeleteUsers extends Block {
  constructor(props: ModalDeleteUsersProps) {
    props.title = 'Удалить пользователя';

    props.listUsersComponent = new ListUsers({
      listChatUsers: props.listChatUsers
    });

    props.buttonCancel = new Button({
      label: 'Назад',
      className: 'button_link button_centered text-main',
      events: {
        click: ()=> this.closeModal()
      }
    });

    super('div', { ...props });
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (!isEqual(oldProps.listChatUsers, newProps.listChatUsers)) {
      this.children.listUsersComponent.setProps({ listChatUsers: newProps.listChatUsers });
      return true;
    }
    return false;
  }

  openModal(): void {
    this.getContent()?.classList.remove('modal_hide');
  }

  closeModal(): void {
    this.children.listUsersComponent.setProps({ listChatUsers: [] });
    this.getContent()?.classList.add('modal_hide');
  }

  render(): string {
    return `
        <div class="modal modal_hide" id="${this.props.modalID}">
            <div class="modal__window">
                <div class="modal__body">
                    <div class="modal__title">${this.props.title}</div>
                    {{{ listUsersComponent }}}
                    {{{ buttonCancel }}}
                </div>
            </div>
        </div>
    `;
  }
}
