import Block from '../../core/Block.js';
import Link from '../../components/link/Link';
import Avatar from '../../components/avatar/Avatar';
import ProfileDataItem from '../../components/profileDataItem/ProfileDataItem';
import Sidebar from "../../components/sidebar/Sidebar";

import '../../components/list/list.css';

export default class ProfilePage extends Block {
    constructor(props = {}) {
        props.sidebar = new Sidebar({
            isFullSize: false
        });

        props.userAvatar = new Avatar({
            url: props.imageUrl
        });

        props.profileItemEmail = new ProfileDataItem({
            label: "Почта",
            isEditable: false,
            value: "pochta@yandex.ru",
            typeValue: "email"
        });
        props.profielItemLogin = new ProfileDataItem({
            label: "Логин",
            isEditable: false,
            value: "ivanivanov",
            typeValue: "text"
        });
        props.profileItemFName = new ProfileDataItem({
            label: "Имя",
            isEditable: false,
            value: "Иван",
            typeValue: "text"
        });
        props.profileItemSName = new ProfileDataItem({
            label: "Фамилия",
            isEditable: false,
            value: "Иванов",
            typeValue: "text"
        });
        props.profileItemChatName = new ProfileDataItem({
            label: "Имя в чате",
            isEditable: false,
            value: "Иван",
            typeValue: "text"
        });
        props.profileItemPhone = new ProfileDataItem({
            label: "Телефон",
            isEditable: false,
            value: "+7 (909) 967 30 30",
            typeValue: "text"
        });

        props.linkChangeData = new Link({
            label: "Изменить данные",
            href: "/src/pages/profileEdit/index.html"
        });

        props.linkChangePassword = new Link({
            label: "Изменить пароль",
            href: "/src/pages/profileEditPassword/index.html"
        });

        props.linkLogout = new Link({
            label: "Выйти",
            href: "/src/pages/login/index.html",
            className: "link_danger"
        });

        super("div", {...props});
    }

    render() {
        return `
            <main class="messenger-container">
                <div class="messenger-body messenger-body_${this.props.typeBody}">
                    {{{ sidebar }}}
                    <div class="profile-content">
                        {{{ userAvatar }}}
                        <div class="profile-name">${this.props.userName}</div>
                    
                        <ul class="list list_full">
                            <li class="list__item">{{{ profileItemEmail }}}</li>
                            <li class="list__item">{{{ profielItemLogin }}}</li>
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