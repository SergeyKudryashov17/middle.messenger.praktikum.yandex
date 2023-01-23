import Button from "../button/Button";
import Field from "../field/Field";
import Form from "../form/Form";
import Block from "../../core/Block";

import { withStore } from "../../hocs/withStore";
import UserService from "../../services/userService";
import ChatService from "../../services/chatService";

import '../modal/modal.css';
import { handleValidateField, resetValidateField, validateForm } from "../../utils/validation";
import { getChatsState } from "../../utils/getChatsState";
import { IChat, IShortDataChat } from "../../api/types";
import * as console from "console";

type ModalAddUserProps = {
  modalID: string,
  title?: string,
  field?: Field,
  form?: Form,
  buttonOk?: Button,
  buttonCancel?: Button,
  selectedChat?: IShortDataChat,
  chatState?: IChat
}

class ModalAddUser extends Block {
  constructor(props: ModalAddUserProps) {
    props.title = 'Добавить пользователя';

    props.field = new Field({
      labelText: 'Введите логин пользователя',
      errorText: '',
      eventsInput: {
        input: () => resetValidateField(props.field as Block),
        blur: () => handleValidateField(props.field as Block)
      }
    });

    props.buttonOk = new Button({
      type: 'submit',
      label: 'Добавить',
      className: 'button_main button_full-width'
    });

    props.buttonCancel = new Button({
      label: 'Назад',
      className: 'button_link button_centered text-main',
      events: {
        click: ()=> this.closeModal()
      }
    });

    props.form = new Form({
      fields: [
        props.field
      ],
      controls: [
        props.buttonOk
      ],
      events: {
        submit: async (event: Event) => {
          event.preventDefault();

          const statusValidate: boolean = validateForm([props.field as Block]);
          if (!statusValidate) {
            return;
          }

          const userRequest = {
            login: (props.field?.children.inputComponent.getContent() as HTMLInputElement).value
          }

          const response = await UserService.searchUser(userRequest);
          const user = response[0];
          if (user === undefined) {
            alert('Пользователь с таким логином не найден');
          }

          if (this.props.selectedChat?.id) {
            const requestAddUser = {
              users: [user.id],
              chatId: this.props.selectedChat?.id
            }
            await ChatService.addUserToChat(requestAddUser);
            this.closeModal();
          }
        }
      }
    });

    super('div', { ...props });
  }

  openModal(): void {
    this.getContent()?.classList.remove('modal_hide');
  }

  closeModal(): void {
    this.children.field.setProps({ inputValue: ''});
    this.getContent()?.classList.add('modal_hide');
  }

  render(): string {
    return `
        <div class="modal modal_hide" id="${this.props.modalID}">
            <div class="modal__window">
                <div class="modal__body">
                    <div class="modal__title">${this.props.title}</div>
                    {{{ form }}}
                    {{{ buttonCancel }}}
                </div>
            </div>
        </div>
    `;
  }
}

export default withStore(getChatsState)(ModalAddUser)
