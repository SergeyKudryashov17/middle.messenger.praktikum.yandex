import Block from '../../core/Block';
import Link from '../../components/link/Link';
import Avatar from '../../components/avatar/Avatar';
import ProfileDataItem from '../../components/profileDataItem/ProfileDataItem';
import Sidebar from "../../components/sidebar/Sidebar";
import Button from "../../components/button/Button";
import { getUserState } from "../../utils/getUserState";
import { withStore } from "../../hocs/withStore";

import '../../components/list/list.css';

import authService from "../../services/authService";

import imageUrl from '../../static/icon/Union.png';
import { UserData } from "../../api/types";

type ProfilePageProps = {
    propDisplay: string,
    userName: string,
    sidebar: Sidebar,
    userAvatar: Avatar,
    profileItemEmail: ProfileDataItem,
    profileItemLogin: ProfileDataItem,
    profileItemFName: ProfileDataItem,
    profileItemSName: ProfileDataItem,
    profileItemChatName: ProfileDataItem,
    profileItemPhone: ProfileDataItem,
    linkChangeData: Link,
    linkChangePassword: Link,
    linkLogout: Link,
    userState: UserData
}

class ProfilePage extends Block {
    constructor(props: ProfilePageProps) {
        const userState: UserData = props.userState;
        console.log('ProfilePage', userState);

        props.propDisplay = 'flex';
        props.userName = userState?.first_name || "";

        props.sidebar = new Sidebar({
            isFullSize: false
        });

        props.userAvatar = new Avatar({
            url: userState?.avatar ? `https://ya-praktikum.tech/api/v2/resources${userState?.avatar}` : imageUrl,
            isEdit: false
        });

        props.profileItemEmail = new ProfileDataItem({
            label: "Почта",
            isEditable: false,
            value: userState?.email || '',
            typeValue: "email"
        });
        props.profileItemLogin = new ProfileDataItem({
            label: "Логин",
            isEditable: false,
            value: userState?.login || '',
            typeValue: "text"
        });
        props.profileItemFName = new ProfileDataItem({
            label: "Имя",
            isEditable: false,
            value: userState?.first_name || '',
            typeValue: "text"
        });
        props.profileItemSName = new ProfileDataItem({
            label: "Фамилия",
            isEditable: false,
            value: userState?.second_name || '',
            typeValue: "text"
        });
        props.profileItemChatName = new ProfileDataItem({
            label: "Имя в чате",
            isEditable: false,
            value: userState?.display_name || '',
            typeValue: "text"
        });
        props.profileItemPhone = new ProfileDataItem({
            label: "Телефон",
            isEditable: false,
            value: userState?.phone,
            typeValue: "text"
        });

        props.linkChangeData = new Link({
            label: "Изменить данные",
            href: "/profileEdit"
        });

        props.linkChangePassword = new Link({
            label: "Изменить пароль",
            href: "/passwordEdit"
        });

        props.linkLogout = new Button({
            label: "Выйти",
            className: "button_link text-danger",
            events: {
                click: () => {
                    authService.logout();
                }
            }
        });

        super("div", {...props});
    }

    componentDidUpdate(oldProps, newProps): boolean {
        const oldUserState = oldProps.userState;
        const newUserState = newProps.userState;

        if (oldUserState.avatar !== newUserState.avatar) {
            this.children.userAvatar.setProps({
                url: newUserState?.avatar ? `https://ya-praktikum.tech/api/v2/resources${newUserState.avatar}` : imageUrl
            });
        }
        if (oldUserState.email !== newUserState.email) {
            this.children.profileItemEmail.setProps({ value: newUserState?.email || '' });
        }
        if (oldUserState.login !== newUserState.login) {
            this.children.profileItemLogin.setProps({ value: newUserState?.login || '' });
        }
        if (oldUserState.first_name !== newUserState.first_name) {
            this.children.profileItemFName.setProps({ value: newUserState?.first_name || '' });
        }
        if (oldUserState.second_name !== newUserState.second_name) {
            this.children.profileItemSName.setProps({ value: newUserState?.second_name || '' });
        }
        if (oldUserState.display_name !== newUserState.display_name) {
            this.children.profileItemChatName.setProps({ value: newUserState?.display_name || '' });
        }
        if (oldUserState.phone !== newUserState.phone) {
            this.children.profileItemPhone.setProps({ value: newUserState?.phone || '' });
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
                        <div class="profile-name">${this.props.userName}</div>
                    
                        <ul class="list list_full">
                            <li class="list__item">{{{ profileItemEmail }}}</li>
                            <li class="list__item">{{{ profileItemLogin }}}</li>
                            <li class="list__item">{{{ profileItemFName }}}</li>
                            <li class="list__item">{{{ profileItemSName }}}</li>
                            <li class="list__item">{{{ profileItemChatName }}}</li>
                            <li class="list__item">{{{ profileItemPhone }}}</li>
                        </ul>
                    
                        <ul class="list list_full">
                            <li class="list__item">{{{ linkChangeData }}}</li>
                            <li class="list__item">{{{ linkChangePassword }}}</li>
                            <li class="list__item">{{{ linkLogout }}}</li>
                        </ul>
                    </div>
                </div>
            </main>
        `;
    }
}

export default withStore(getUserState)(ProfilePage);


