import Block from '../../core/Block';
import Button from '../../components/button/Button';
import Avatar from '../../components/avatar/Avatar';
import ProfileDataItem from '../../components/profileDataItem/ProfileDataItem';
import Sidebar from "../../components/sidebar/Sidebar";
import Form from "../../components/form/Form";

import {handleValidateField, resetValidateField, validateForm} from "../../utils/validation";

import '../../components/list/list.css';
import { withStore } from "../../hocs/withStore";
import { getUserState } from "../../utils/getUserState";

import imageUrl from '../../static/icon/Union.png';
import { IProfileData, UserData } from "../../api/types";
import UserService from "../../services/userService";

type ProfilePageProps = {
    propDisplay: string,
    sidebar: Sidebar,
    userAvatar: Avatar,
    profileItemEmail: ProfileDataItem,
    profileItemLogin: ProfileDataItem,
    profileItemFName: ProfileDataItem,
    profileItemSName: ProfileDataItem,
    profileChatName: ProfileDataItem,
    profileItemPhone: ProfileDataItem,
    fieldList: ProfileDataItem[],
    btnSave: Button,
    form: Form,
    userState: UserData
}

class EditProfilePage extends Block {
    constructor(props: ProfilePageProps) {
        const userState: UserData = props.userState;

        props.propDisplay = 'flex';

        props.sidebar = new Sidebar({
            isFullSize: false
        });

        props.userAvatar = new Avatar({
            url: `https://ya-praktikum.tech/api/v2/resources${userState.avatar}` || imageUrl,
            isEdit: true,
            events: {
                change: async (event: Event) => {
                    event.stopPropagation();
                    const fileAvatar = event.target.files[0];
                    const request = new FormData();
                    request.append('avatar', fileAvatar);
                    const response = await UserService.changeAvatar(request);
                    console.log(response);
                }
            }
        });

        props.profileItemEmail = new ProfileDataItem({
            className: 'list__item',
            label: "Почта",
            isEditable: true,
            value: userState.email || "",
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
            value: userState.login || "",
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
            value: userState.first_name || "",
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
            value: userState.second_name || "",
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
            className: "list__item",
            label: "Имя в чате",
            isEditable: true,
            value: userState.display_name || "",
            typeValue: "text",
            inputName: "display_name",
            validateRule: "name",
            fieldClass: "field_right",
            eventsField: {
                input: () => resetValidateField(props.profileChatName.children.field),
                blur: () => handleValidateField(props.profileChatName.children.field)
            }
        });
        props.profileItemPhone = new ProfileDataItem({
            className: "list__item",
            label: "Телефон",
            isEditable: true,
            value: userState.phone || "",
            typeValue: "text",
            inputName: "phone",
            validateRule: "phone",
            fieldClass: "field_right",
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

                    let userData = {};
                    Array.from(document.querySelectorAll('.profile-data .input')).map((input: HTMLInputElement) => {
                        userData[input.name] = input.value;
                    });

                    UserService.changeProfile(userData as IProfileData);
                }
            }
        });

        super("div", {...props});
    }

    componentDidUpdate(oldProps, newProps): boolean {
        const oldUserState = oldProps.userState;
        const newUserState = newProps.userState;

        if (oldUserState.avatar !== newUserState.avatar) {
            this.children.userAvatar.setProps({ url: `https://ya-praktikum.tech/api/v2/resources${newUserState.avatar}` });
        }

        return true;
    }

    render(): string {
        return `
            <main class="messenger-container">
                <div class="messenger-body messenger-body_profile">
                    {{{ sidebar }}}
                    <div class="profile-content">
                        {{{ userAvatar }}}
                        
                        <div class="profile-name"></div>
                        
                        {{{ form }}}
                    </div>
                </div>
            </main>
        `;
    }
}

export default withStore(getUserState)(EditProfilePage);
