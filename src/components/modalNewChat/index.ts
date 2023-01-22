import Button from "../button/Button";
import Field from "../field/Field";
import Form from "../form/Form";
import Block from "../../core/Block";

import ChatService from "../../services/chatService";

import '../modal/modal.css';
import { handleValidateField, resetValidateField, validateForm } from "../../utils/validation";
import { IRequestNewChat } from "../../api/types";

type ModalNewChatProps = {
  modalID: string,
  title?: string,
  field?: Field,
  form?: Form,
  buttonOk?: Button,
  buttonCancel?: Button
}

export default class ModalNewChat extends Block {
  constructor(props: ModalNewChatProps) {
    props.title = 'Создать новый чат';

    props.field = new Field({
      labelText: 'Название чата',
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

          const request: IRequestNewChat = {
            title: (props.field?.children.inputComponent.getContent() as HTMLInputElement).value
          }
          await ChatService.createChat(request);

          this.closeModal();
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
