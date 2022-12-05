import Block from '../../core/Block';
import Sidebar from "../../components/sidebar/Sidebar";
import Interlocutor from "../../components/interlocutor/Interlocutor";
import Button from "../../components/button/Button";
import DropdownMenu from "../../components/dropdownMenu/DropdownMenu";
import Input from '../../components/input/Input';
import MessagesGroup from '../../components/messages-group/MessagesGroup'
import { validate } from '../../utils/validation';
import { getListDialogs } from "../../models/dialogsData";

export default class DialogPage extends Block {
    constructor(props: any = {}) {
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
                    icon: "/static/icon/add-icon.svg"
                },
                {
                    label: "Удалить пользователя",
                    className: "open-delete-modal",
                    icon: "/static/icon/remove-icon.svg"
                }
            ]
        });

        props.attachMenu = new DropdownMenu({
            id: 'attached-menu',
            items: [
                {
                    label: "Фото или видео",
                    className: "open-modal-upload-image",
                    icon: "/static/icon/attach-image.svg"
                },
                {
                    label: "Файл",
                    className: "open-modal-upload-image",
                    icon: "/static/icon/attach-file.svg"
                },
                {
                    label: "Локация",
                    className: "open-modal-upload-image",
                    icon: "/static/icon/attach-location.svg"
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
            type: 'icon',
            events: {
                click: (event) => {
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
            type: 'icon',
            className: 'fa-arrow-right button button_circle button_main',
            events: {
                click: () => {
                    let messageText: string = props.inputMessage.getContent().value;
                    let validateStatus: string = validate('', messageText);

                    if (validateStatus !== '') {
                        alert(validateStatus);
                    } else {
                        let response = {
                            message: messageText
                        };

                        console.log(response);
                    }
                }
            }
        });

        props.attachedBtn = new Button({
            type: 'icon',
            className: 'fa-paperclip fa-flip-vertical add-attached-file',
            events: {
                click: (event) => {
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