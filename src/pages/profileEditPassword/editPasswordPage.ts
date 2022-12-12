import Block from '../../core/Block';
import Button from '../../components/button/Button';
import Avatar from '../../components/avatar/Avatar';
import ProfileDataItem from '../../components/profileDataItem/ProfileDataItem';
import Sidebar from "../../components/sidebar/Sidebar";
import {checkPasswordMatch, handleValidateField, resetValidateField, validateForm} from "../../utils/validation";

import '../../components/list/list.css';

export default class EditPasswordPage extends Block {
    constructor(props: any = {}) {
        props.sidebar = new Sidebar({
            isFullSize: false
        });

        props.userAvatar = new Avatar({
            url: props.imageUrl
        });

        props.profileItemOldPassword = new ProfileDataItem({
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
            label: "Сохранить",
            className: "button_main button_centered",
            events: {
                click: () => {
                    const statusValidate: boolean = validateForm(this.props.fieldList);

                    if (!statusValidate) {
                        alert('Форма заполнена неверно. Сохранение невозможно');
                        return;
                    }

                    let formData = Array.from(document.querySelectorAll('.profile-data')).map((item: HTMLElement) => {
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
                    
                        <form>
                            <ul class="list list_full">
                                <li class="list__item">{{{ profileItemOldPassword }}}</li>
                                <li class="list__item">{{{ profileItemNewPassword }}}</li>
                                <li class="list__item">{{{ profileItemNewPasswordRepeat }}}</li>
                            </ul>
                        
                            {{{ btnSave }}}
                        </form>
                    </div>
                </div>
            </main>
        `;
    }
}
