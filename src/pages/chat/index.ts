import Block from '../../core/Block';
import Sidebar from "../../components/sidebar/Sidebar";
import Interlocutor from "../../components/interlocutor/Interlocutor";
import Button from "../../components/button/Button";
import DropdownMenu from "../../components/dropdownMenu/DropdownMenu";
import Input from '../../components/input/Input';
import MessagesGroup, { IMessagesGroupProps } from "../../components/messages-group/MessagesGroup";
import { validate } from '../../utils/validation';
import { getListDialogs } from "../../models/dialogsData";

import addIconUrl from '../../static/icon/add-icon.svg';
import removeIconUrl from '../../static/icon/remove-icon.svg';
import attachImgIconUrl from '../../static/icon/attach-image.svg';
import attachFileUrl from '../../static/icon/attach-file.svg';
import attachLocationUrl from '../../static/icon/attach-location.svg';
import imageUrl from "../../static/img/image.png";

type DialogPageProps = {
    propDisplay?: string,
    messagesGroups: IMessagesGroupProps[],
    messagesGroupsLabels: string,
    sidebar: Sidebar,
    interlocutor: Interlocutor,
    settingsDialogMenu: DropdownMenu,
    attachMenu: DropdownMenu,
    inputMessage: Input,
    settingsDialogBtn: Button,
    sendMessageBtn: Button,
    attachedBtn: Button,

}

class DialogPage extends Block {
    constructor(props: DialogPageProps) {
        props.propDisplay = 'flex';
        props.messagesGroups = [
            {
                "date": "19 июня",
                "messages": [
                    {
                        "isText": true,
                        "text": [
                            "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.",
                            "Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро."
                        ],
                        "date": "11:26",
                        "fromMe": false
                    },
                    {
                        "isImage": true,
                        "src": imageUrl,
                        "date": "11:56",
                        "fromMe": false
                    },
                    {
                        "isText": true,
                        "text": ["Круто!"],
                        "date": "12:00",
                        "fromMe": true,
                        "isRead": true
                    }
                ]
            }
        ];

        props.messagesGroupsLabels = '';
        props.messagesGroups.forEach((group, index) => {
            let label = `messagesGroup${index}`;
            props[label] = new MessagesGroup(group);
            props.messagesGroupsLabels += `{{{ ${label} }}}`;
        });

        props.sidebar = new Sidebar({
            isFullSize: true,
            dialogList: getListDialogs()
        });

        props.interlocutor = new Interlocutor({
            name: 'Тест'
        });

        props.settingsDialogMenu = new DropdownMenu({
            id: 'setting-dialog-menu',
            items: [
                {
                    label: "Добавить пользователя",
                    className: "open-invite-modal",
                    icon: addIconUrl
                },
                {
                    label: "Удалить пользователя",
                    className: "open-delete-modal",
                    icon: removeIconUrl
                }
            ]
        });

        props.attachMenu = new DropdownMenu({
            id: 'attached-menu',
            items: [
                {
                    label: "Фото или видео",
                    className: "open-modal-upload-image",
                    icon: attachImgIconUrl
                },
                {
                    label: "Файл",
                    className: "open-modal-upload-image",
                    icon: attachFileUrl
                },
                {
                    label: "Локация",
                    className: "open-modal-upload-image",
                    icon: attachLocationUrl
                }
            ]
        });

        props.inputMessage = new Input({
            type: 'text',
            className: 'input_message',
            name: 'message'
        });

        props.settingsDialogBtn = new Button({
            className: 'fa-ellipsis-v setting-dialog',
            view: 'icon',
            events: {
                click: (event: Event) => {
                    const btnElem: HTMLElement = props.settingsDialogBtn.getContent();
                    const settingMenu: DropdownMenu = props.settingsDialogMenu;

                    btnElem.classList.toggle('setting-dialog_active');
                    btnElem.classList.contains('setting-dialog_active')
                      ? settingMenu.open(event)
                      : settingMenu.close();
                }
            }
        });

        props.sendMessageBtn = new Button({
            className: 'button button_circle button_main',
            label: '<i class="fa fa-arrow-right" aria-hidden="true"></i>',
            events: {
                click: () => {
                    const messageText: string = props.inputMessage.getContent().value;
                    const validateStatus: string = validate('', messageText);

                    if (validateStatus !== '') {
                        alert(validateStatus);
                    } else {
                        const response = {
                            message: messageText
                        };

                        console.log(response);
                    }
                }
            }
        });

        props.attachedBtn = new Button({
            view: 'icon',
            className: 'fa-paperclip fa-flip-vertical add-attached-file',
            events: {
                click: (event: Event) => {
                    const attachBtn: HTMLElement = props.attachedBtn.getContent();
                    const attachMenu: DropdownMenu = props.attachMenu;

                    attachBtn.classList.toggle('add-attached-file_active');
                    attachBtn.classList.contains('add-attached-file_active')
                      ? attachMenu.open(event)
                      : attachMenu.close();
                }
            }
        });

        super("div", {...props});
    }

    render(): string {
        return `
            <main class="messenger-container">
                <div class="messenger-body">
                    {{{ sidebar }}}
                    <div class="chat-body">
                        <div class="chat-body__header">
                            {{{ interlocutor }}}
                            {{{ settingsDialogBtn }}}
                            {{{ settingsDialogMenu }}}
                        </div>
                        <div class="chat-body__list">
                            ${this.props.messagesGroupsLabels}
                        </div>
                        <div class="chat-body__footer">
                            {{{ attachedBtn }}}
                            {{{ attachMenu }}}
                            {{{ inputMessage }}}
                            {{{ sendMessageBtn }}}
                        </div>
                    </div>
                </div>
            </main>
        `;
    }
}

export default DialogPage;
