import Block from '../../core/Block';
import Button from '../../components/button/Button';
import Avatar from '../../components/avatar/Avatar';
import ProfileDataItem from '../../components/profileDataItem/ProfileDataItem';
import Sidebar from "../../components/sidebar/Sidebar";

import {checkPasswordMatch, handleValidateField, resetValidateField, validateForm} from "../../utils/validation";
import UserService from "../../services/userService";

import '../../components/list/list.css';
import Form from "../../components/form/Form";
import imageUrl from "../../static/icon/Union.png";
import { IPasswordData, UserData } from "../../api/types";
import { withStore } from "../../hocs/withStore";
import { getUserState } from "../../utils/getUserState";

type EditPasswordPageProps = {
    propDisplay: string,
    userName: string,
    sidebar: Sidebar,
    userAvatar: Avatar,
    profileItemOldPassword: ProfileDataItem,
    profileItemNewPassword: ProfileDataItem,
    profileItemNewPasswordRepeat: ProfileDataItem,
    fieldList: ProfileDataItem[],
    btnSave: Button,
    form: Form,
    userState: UserData
}

class EditPasswordPage extends Block {
    constructor(props: EditPasswordPageProps) {
        const userState: UserData = props.userState;
        props.propDisplay = 'flex';
        props.userName = userState.first_name;

        props.sidebar = new Sidebar({
            isFullSize: false
        });

        props.userAvatar = new Avatar({
            url: `https://ya-praktikum.tech/api/v2/resources${userState.avatar}` || imageUrl,
            isEdit: false
        });

        props.profileItemOldPassword = new ProfileDataItem({
            className: 'list__item',
            label: "Старый пароль",
            isEditable: true,
            value: "1234",
            typeValue: "password",
            inputID: "oldPassword",
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
            value: "1234",
            typeValue: "password",
            inputID: "newPassword",
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
            value: "1234",
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
                submit: async (event: Event) => {
                    event.preventDefault();
                    const statusValidate: boolean = validateForm(this.props.fieldList);

                    if (!statusValidate) {
                        alert('Форма заполнена неверно. Сохранение невозможно');
                        return;
                    }

                    const passwordRequest: IPasswordData = {
                        oldPassword: (document.querySelector('#oldPassword') as HTMLInputElement).value,
                        newPassword: (document.querySelector('#newPassword') as HTMLInputElement).value
                    };

                    await UserService.changePassword(passwordRequest);
                }
            }
        });

        super("div", {...props});
    }

    render(): string {
        return `
            <main class="messenger-container">
                <div class="messenger-body messenger-body_profile">
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

export default withStore(getUserState)(EditPasswordPage);


