import Block from '../../core/Block';
import DialogList from "../dialogList/DialogList";
import Input from "../input/Input";
import Link from "../link/Link";

import './sidebar.css';

export default class Sidebar extends Block {
    constructor(props) {
        props.search = new Input({
            type: 'text',
            className: 'input_search-dialog',
            placeholder: '&#xf002; Поиск'
        });

        props.profileLink = new Link({
            href: '/src/pages/profile/index.html',
            label: 'Профиль >'
        });

        props.backLink = new Link({
            href: '#',
            className: 'button button_main button_circle link_white',
            label: '<i class="fa fa-arrow-left" aria-hidden="true"></i>'
        });

        props.dialogList = new DialogList({
            dialogsData: [
                {
                    "name": "Андрей",
                    "time": "10:49",
                    "isMyMessage": false,
                    "preview": "Изображение",
                    "unread": 2
                },
                {
                    "name": "Киноклуб",
                    "time": "12:00",
                    "isMyMessage": true,
                    "preview": "стикер",
                    "unread": 0
                },
                {
                    "name": "Илья",
                    "time": "15:12",
                    "isMyMessage": false,
                    "preview": "Друзья, у меня для вас особенный выпуск новостей!...",
                    "unread": 2
                },
                {
                    "name": "Вадим",
                    "time": "15:12",
                    "isMyMessage": true,
                    "preview": "круто",
                    "unread": 0
                },
                {
                    "name": "тет-а-теты",
                    "time": "15:12",
                    "isMyMessage": false,
                    "preview": "И Human Interface Guidelines и Material Design рекомендуют...",
                    "unread": 0
                },
                {
                    "name": "1, 2, 3",
                    "time": "Пт",
                    "isMyMessage": false,
                    "preview": "Миллионы россиян ежедневно проводят десятки часов свое...",
                    "unread": 0
                },
                {
                    "name": "Design Destroyer",
                    "time": "Пн",
                    "isMyMessage": false,
                    "preview": "В 2008 году художник Jon Rafman начал собирать...",
                    "unread": 0
                },
                {
                    "name": "Day.",
                    "time": "Пн",
                    "isMyMessage": false,
                    "preview": "круто",
                    "unread": 0
                },
                {
                    "name": "Стас Рогозин",
                    "time": "12 Апр 2020",
                    "isMyMessage": false,
                    "preview": "Можно или сегодня или завтра вечером.",
                    "unread": 0
                }
            ]
        });

        super("aside", {...props});
    }

    render(): string {
        const isFullSize: Boolean = Boolean(this.props.isFullSize);

        const sidebarHead: string = `
            <div class="sidebar__head">
                <div class="messenger-controls">
                    {{{ profileLink }}}
                </div>
                {{{ search }}}
            </div>
        `;

        return `
            <aside class="sidebar ${ !isFullSize ? 'sidebar_small sidebar_empty' : '' }">
                ${ isFullSize ? sidebarHead : '' }
                <div class="sidebar__body ${ !isFullSize ? 'sidebar__body_centered' : '' }">
                    ${ isFullSize ? '{{{ dialogList }}}' : '{{{ backLink }}}' }
                </div>
            </aside>
        `;
    }
}