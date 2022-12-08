import Block from '../../core/Block';
import Button from '../../components/button/Button';
import Avatar from '../../components/avatar/Avatar';
import ProfileDataItem from '../../components/profileDataItem/ProfileDataItem';
import Sidebar from "../../components/sidebar/Sidebar";
import {handleValidateField, resetValidateField, validateForm} from "../../utils/validation";

import '../../components/list/list.css';

export default class EditProfilePage extends Block {
    constructor(props: any = {}) {
        props.sidebar = new Sidebar({
            isFullSize: false
        });

        props.userAvatar = new Avatar({
            url: props.imageUrl
        });

        props.profileItemEmail = new ProfileDataItem({
            label: "Почта",
            isEditable: true,
            value: "pochta@yandex.ru",
            typeValue: "email",
            validateRule: 'email',
            fieldClass: 'field_right',
            eventsField: {
                input: () => resetValidateField(props.profileItemEmail.children.field),
                blur: () => handleValidateField(props.profileItemEmail.children.field)
            }
        });
        props.profileItemLogin = new ProfileDataItem({
            label: "Логин",
            isEditable: true,
            value: "ivanivanov",
            typeValue: "text",
            validateRule: 'login',
            fieldClass: 'field_right',
            eventsField: {
                input: () => resetValidateField(props.profileItemLogin.children.field),
                blur: () => handleValidateField(props.profileItemLogin.children.field)
            }
        });
        props.profileItemFName = new ProfileDataItem({
            label: "Имя",
            isEditable: true,
            value: "Иван",
            typeValue: "text",
            validateRule: 'name',
            fieldClass: 'field_right',
            eventsField: {
                input: () => resetValidateField(props.profileItemFName.children.field),
                blur: () => handleValidateField(props.profileItemFName.children.field)
            }
        });
        props.profileItemSName = new ProfileDataItem({
            label: "Фамилия",
            isEditable: true,
            value: "Иванов",
            typeValue: "text",
            validateRule: 'name',
            fieldClass: 'field_right',
            eventsField: {
                input: () => resetValidateField(props.profileItemSName.children.field),
                blur: () => handleValidateField(props.profileItemSName.children.field)
            }
        });
        props.profileChatName = new ProfileDataItem({
            label: "Имя в чате",
            isEditable: true,
            value: "Иван",
            typeValue: "text",
            validateRule: 'name',
            fieldClass: 'field_right',
            eventsField: {
                input: () => resetValidateField(props.profileChatName.children.field),
                blur: () => handleValidateField(props.profileChatName.children.field)
            }
        });
        props.profileItemPhone = new ProfileDataItem({
            label: "Телефон",
            isEditable: true,
            value: "+79099673030",
            typeValue: "text",
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
            label: "Изменить данные",
            className: "button_main button_centered",
            events: {
                click: () => {
                    let statusValidate: boolean = validateForm(this.props.fieldList);

                    if (!statusValidate) {
                        alert('Форма заполнена неверно. Сохранение невозможно');
                        return;
                    }

                    let formData = Array.from(document.querySelectorAll('.profile-data')).map(item => {
                        return {
                            label: item.querySelector('.profile-data__label').textContent,
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
                    
                        <ul class="list list_full">
                            <li class="list__item">{{{ profileItemEmail }}}</li>
                            <li class="list__item">{{{ profileItemLogin }}}</li>
                            <li class="list__item">{{{ profileItemFName }}}</li>
                            <li class="list__item">{{{ profileItemSName }}}</li>
                            <li class="list__item">{{{ profileChatName }}}</li>
                            <li class="list__item">{{{ profileItemPhone }}}</li>
                        </ul>
                    
                        {{{ btnSave }}}
                    </div>
                </div>
            </main>
        `;
    }
}