import Block from '../../core/Block';
import Button from '../../components/button/Button';
import Avatar from '../../components/avatar/Avatar';
import ProfileDataItem from '../../components/profileDataItem/ProfileDataItem';
import Sidebar from "../../components/sidebar/Sidebar";
import Form from "../../components/form/Form";

import IProfilePageProps from '../../types/IProfilePageProps';

import {handleValidateField, resetValidateField, validateForm} from "../../utils/validation";

import '../../components/list/list.css';

export default class EditProfilePage extends Block {
    constructor(props: IProfilePageProps) {
        props.sidebar = new Sidebar({
            isFullSize: false
        });

        props.userAvatar = new Avatar({
            url: props.imageUrl
        });

        props.profileItemEmail = new ProfileDataItem({
            className: 'list__item',
            label: "Почта",
            isEditable: true,
            value: "pochta@yandex.ru",
            typeValue: "email",
            inputName: 'email',
            validateRule: 'email',
            fieldClass: 'field_right',
            eventsField: {
                input: () => resetValidateField(props.profileItemEmail.children.field),
                blur: () => handleValidateField(props.profileItemEmail.children.field)
            }
        });
        props.profileItemLogin = new ProfileDataItem({
            className: 'list__item',
            label: "Логин",
            isEditable: true,
            value: "ivanivanov",
            typeValue: "text",
            inputName: 'login',
            validateRule: 'login',
            fieldClass: 'field_right',
            eventsField: {
                input: () => resetValidateField(props.profileItemLogin.children.field),
                blur: () => handleValidateField(props.profileItemLogin.children.field)
            }
        });
        props.profileItemFName = new ProfileDataItem({
            className: 'list__item',
            label: "Имя",
            isEditable: true,
            value: "Иван",
            typeValue: "text",
            inputName: 'first_name',
            validateRule: 'name',
            fieldClass: 'field_right',
            eventsField: {
                input: () => resetValidateField(props.profileItemFName.children.field),
                blur: () => handleValidateField(props.profileItemFName.children.field)
            }
        });
        props.profileItemSName = new ProfileDataItem({
            className: 'list__item',
            label: "Фамилия",
            isEditable: true,
            value: "Иванов",
            typeValue: "text",
            inputName: 'second_name',
            validateRule: 'name',
            fieldClass: 'field_right',
            eventsField: {
                input: () => resetValidateField(props.profileItemSName.children.field),
                blur: () => handleValidateField(props.profileItemSName.children.field)
            }
        });
        props.profileChatName = new ProfileDataItem({
            className: 'list__item',
            label: "Имя в чате",
            isEditable: true,
            value: "Иван",
            typeValue: "text",
            inputName: 'chat-name',
            validateRule: 'name',
            fieldClass: 'field_right',
            eventsField: {
                input: () => resetValidateField(props.profileChatName.children.field),
                blur: () => handleValidateField(props.profileChatName.children.field)
            }
        });
        props.profileItemPhone = new ProfileDataItem({
            className: 'list__item',
            label: "Телефон",
            isEditable: true,
            value: "+79099673030",
            typeValue: "text",
            inputName: 'phone',
            validateRule: 'phone',
            fieldClass: 'field_right',
            eventsField: {
                input: () => resetValidateField(props.profileItemPhone.children.field),
                blur: () => handleValidateField(props.profileItemPhone.children.field)
            }
        });

        props.fieldList = [
            props.profileItemEmail.children.field,
            props.profileItemLogin.children.field,
            props.profileItemFName.children.field,
            props.profileItemSName.children.field,
            props.profileChatName.children.field,
            props.profileItemPhone.children.field
        ];

        props.btnSave = new Button({
            type: 'submit',
            label: "Изменить данные",
            className: "button_main button_centered"
        });

        props.form = new Form({
            className: 'list list_full',
            fields: [
                props.profileItemEmail,
                props.profileItemLogin,
                props.profileItemFName,
                props.profileItemSName,
                props.profileChatName,
                props.profileItemPhone
            ],
            controls: [
                props.btnSave
            ],
            events: {
                submit: (event: Event) => {
                    event.preventDefault();
                    const statusValidate: boolean = validateForm(this.props.fieldList);

                    if (!statusValidate) {
                        alert('Форма заполнена неверно. Сохранение невозможно');
                        return;
                    }

                    const formData = Array.from(document.querySelectorAll('.profile-data')).map((item: HTMLElement) => {
                        return {
                            label: (item.querySelector('.profile-data__label') as HTMLLabelElement).textContent,
                            value: (item.querySelector('.input') as HTMLInputElement).value
                        }
                    });

                    console.log(formData);
                }
            }
        });

        super("div", {...props});
    }

    render(): string {
        return `
            <main class="messenger-container">
                <div class="messenger-body messenger-body_${this.props.typeBody}">
                    {{{ sidebar }}}
                    <div class="profile-content">
                        {{{ userAvatar }}}
                        <div class="profile-name">${this.props.userName}</div>
                        
                        {{{ form }}}
                    </div>
                </div>
            </main>
        `;
    }
}
