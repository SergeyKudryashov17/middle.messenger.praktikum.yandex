import Block from '../../core/Block';
import Button from '../../components/button/Button';
import Avatar from '../../components/avatar/Avatar';
import ProfileDataItem from '../../components/profileDataItem/ProfileDataItem';
import Sidebar from "../../components/sidebar/Sidebar";

import {checkPasswordMatch, handleValidateField, resetValidateField, validateForm} from "../../utils/validation";

import IProfilePageProps from '../../types/IProfilePageProps';

import '../../components/list/list.css';
import Form from "../../components/form/Form";

export default class EditPasswordPage extends Block {
    constructor(props: IProfilePageProps) {
        props.sidebar = new Sidebar({
            isFullSize: false
        });

        props.userAvatar = new Avatar({
            url: props.imageUrl
        });

        props.profileItemOldPassword = new ProfileDataItem({
            className: 'list__item',
            label: "Старый пароль",
            isEditable: true,
            value: "oldTestPassword123",
            typeValue: "password",
            inputName: "password-old",
            validateRule: "password",
            fieldClass: 'field_right',
            eventsField: {
                input: () => resetValidateField(props.profileItemOldPassword.children.field),
                blur: () => handleValidateField(props.profileItemOldPassword.children.field)
            }
        });
        props.profileItemNewPassword = new ProfileDataItem({
            className: 'list__item',
            label: "Новый пароль",
            isEditable: true,
            value: "newTestPassword123",
            typeValue: "password",
            inputName: "password-new",
            validateRule: "password",
            fieldClass: 'field_right',
            eventsField: {
                input: () => resetValidateField(props.profileItemNewPassword.children.field),
                blur: () => handleValidateField(props.profileItemNewPassword.children.field)
            }
        });
        props.profileItemNewPasswordRepeat = new ProfileDataItem({
            className: 'list__item',
            label: "Повторите новый пароль",
            isEditable: true,
            value: "newTestPassword123",
            typeValue: "password",
            inputName: "password-new-repeat",
            validateRule: "password",
            fieldClass: 'field_right',
            eventsField: {
                input: () => resetValidateField(props.profileItemNewPasswordRepeat.children.field),
                blur: () => {
                    const fieldNewPassword: Block = props.profileItemNewPassword.children.field;
                    const fieldNewPasswordRepeat: Block = props.profileItemNewPasswordRepeat.children.field

                    if (!handleValidateField(props.profileItemNewPasswordRepeat.children.field)) return;
                    const error: string = (!checkPasswordMatch(fieldNewPassword, fieldNewPasswordRepeat))
                      ? 'Пароли не совпадают'
                      : '';
                    const errorComponent: Block = fieldNewPasswordRepeat.children.errorTextComponent;
                    errorComponent.setProps({
                        className: (error !== '') ? 'error-label_show' : '',
                        text: error
                    });
                }
            }
        });

        props.fieldList = [
            props.profileItemOldPassword.children.field,
            props.profileItemNewPassword.children.field,
            props.profileItemNewPasswordRepeat.children.field
        ];

        props.btnSave = new Button({
            type: "submit",
            label: "Сохранить",
            className: "button_main button_centered"
        });

        props.form = new Form({
            className: 'list list_full',
            fields: [
                props.profileItemOldPassword,
                props.profileItemNewPassword,
                props.profileItemNewPasswordRepeat
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

                    let formData = Array.from(document.querySelectorAll('.profile-data')).map((item: HTMLElement) => {
                        const input: HTMLInputElement | null = item.querySelector('.input');
                        return {
                            label: input?.name,
                            value: input?.value
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
