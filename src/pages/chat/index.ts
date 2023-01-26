import Block from '../../core/Block';
import Sidebar from "../../components/sidebar/Sidebar";
import Interlocutor from "../../components/interlocutor/Interlocutor";
import Button from "../../components/button/Button";
import DropdownMenu from "../../components/dropdownMenu/DropdownMenu";
import Input from '../../components/input/Input';
import ChatService from '../../services/chatService';
import ModalAddUser from "../../components/modalAddUser";
import ModalDeleteUsers from "../../components/modalDeleteUsers";
import MessagesService from "../../services/messagesService";
import Message from "../../components/message/Message";

import { validate } from '../../utils/validation';
import { withStore } from "../../hocs/withStore";
import { getMainState } from "../../utils/getMainState";
import isEqual from "../../utils/isEqual";

import { IFullMessage, IShortDataChat } from "../../api/types";

import addIconUrl from '../../static/icon/add-icon.svg';
import removeIconUrl from '../../static/icon/remove-icon.svg';
import attachImgIconUrl from '../../static/icon/attach-image.svg';
import attachFileUrl from '../../static/icon/attach-file.svg';
import attachLocationUrl from '../../static/icon/attach-location.svg';

type DialogPageProps = {
    propDisplay: string,
    messagesGroupsLabels: string,
    sidebar: Block,
    interlocutor: Block,
    settingsDialogMenu: DropdownMenu,
    attachMenu: DropdownMenu,
    inputMessage: Input,
    settingsDialogBtn: Button,
    sendMessageBtn: Button,
    attachedBtn: Button,
    modalAddUser: Block,
    modalDeleteUsers: ModalDeleteUsers
}

type DialogPageState = {
    selectedChat: IShortDataChat,
    messages?: IFullMessage[],
}

class DialogPage extends Block {
    private messagesLabels: string = '';

    constructor(props: DialogPageProps & DialogPageState) {
        props.sidebar = new Sidebar({
            isFullSize: true
        });

        props.interlocutor = new Interlocutor({});

        props.settingsDialogMenu = new DropdownMenu({
            id: 'setting-dialog-menu',
            items: [
                {
                    label: "Добавить пользователя",
                    className: "open-invite-modal",
                    icon: addIconUrl,
                    events: {
                        click: () => this.props.modalAddUser.openModal()
                    }
                },
                {
                    label: "Удалить пользователя",
                    className: "open-delete-modal",
                    icon: removeIconUrl,
                    events: {
                        click: async () => {
                            const currentChatID = this.props.selectedChat.id;
                            const chatUsers = await ChatService.getChatsUsers(currentChatID);
                            if (chatUsers) {
                                this.children.modalDeleteUsers.setProps({ listChatUsers: chatUsers });
                            }
                            props.modalDeleteUsers.openModal();
                        }
                    }
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
                    const btnElem: HTMLElement | null = props.settingsDialogBtn.getContent();
                    const settingMenu: DropdownMenu = props.settingsDialogMenu;

                    btnElem?.classList.toggle('setting-dialog_active');
                    btnElem?.classList.contains('setting-dialog_active')
                      ? settingMenu.open(event)
                      : settingMenu.close();
                }
            }
        });

        props.sendMessageBtn = new Button({
            className: 'button button_circle button_main',
            label: '<i class="fa fa-arrow-right" aria-hidden="true"></i>',
            events: {
                click: async () => {
                    const messageText: string = (props.inputMessage.getContent() as HTMLInputElement).value;
                    const validateStatus: string = validate('', messageText);

                    if (validateStatus !== '') {
                        alert(validateStatus);
                    } else {
                        const currentChatID = this.props.selectedChat.id;

                        try {
                            await MessagesService.sendMessage(currentChatID, messageText);
                            (props.inputMessage.getContent() as HTMLInputElement).value = '';
                        } catch (e) {
                            alert('Произошла ошибка при отправке сообщения. Попробуйте позже');
                        }
                    }
                }
            }
        });

        props.attachedBtn = new Button({
            view: 'icon',
            className: 'fa-paperclip fa-flip-vertical add-attached-file',
            events: {
                click: (event: Event) => {
                    const attachBtn: HTMLElement | null = props.attachedBtn.getContent();
                    const attachMenu: DropdownMenu = props.attachMenu;

                    attachBtn?.classList.toggle('add-attached-file_active');
                    attachBtn?.classList.contains('add-attached-file_active')
                      ? attachMenu.open(event)
                      : attachMenu.close();
                }
            }
        });

        props.modalAddUser = new ModalAddUser({
            modalID: 'modalAddUser'
        });

        props.modalDeleteUsers = new ModalDeleteUsers({
            modalID: 'modalDeleteUsers'
        });

        super("div", { ...props });

        this.propDisplay = 'flex';
    }

    async componentDidMount() {
        await ChatService.getListChats();
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        const chatID = newProps.selectedChat?.id;

        if (!isEqual(oldProps.messages[chatID], newProps.messages[chatID]) && chatID !== undefined) {
            this.renderMessages(newProps.messages[chatID]);
            return true;
        }

        if (!isEqual(oldProps.selectedChat, newProps.selectedChat) && chatID !== undefined) {
            this.renderMessages(newProps.messages[chatID]);
            return true;
        }

        return false;
    }

    componentReady(): void {
        const chatList = this.getContent()?.querySelector('.chat-body__list');
        if (chatList) {
            chatList.scrollTop = chatList.scrollHeight;
        }
    }

    renderMessages(messages: IFullMessage[]): void {
        this.messagesLabels = '';
        const chatList = this.getContent()?.querySelector('.chat-body__list') as HTMLElement;
        if (chatList) {
            chatList.innerHTML = '';
        }

        messages.forEach((message: IFullMessage, index: number) => {
            let label = `message${index}`;
            this.children[label] = new Message({ ...message, currentUserID: this.props?.user?.id});
            this.messagesLabels = `{{{ ${label} }}}` + this.messagesLabels;
        });
    }

    render(): string {
        const chatBodyEmpty = `<div class="empty-chat-warning">Выберите чат чтобы отправить сообщение</div>`;
        const chatBody = `
            <div class="chat-body__header">
                {{{ interlocutor }}}
                {{{ settingsDialogBtn }}}
                {{{ settingsDialogMenu }}}
            </div>
            <div class="chat-body__list">
                ${this.messagesLabels}
            </div>
            <div class="chat-body__footer">
                {{{ attachedBtn }}}
                {{{ attachMenu }}}
                {{{ inputMessage }}}
                {{{ sendMessageBtn }}}
            </div>
        `;

        return `
            <main class="messenger-container">
                <div class="messenger-body">
                    {{{ sidebar }}}
                    <div class="chat-body">
                        ${this.props.selectedChat.id === undefined ? chatBodyEmpty : chatBody}
                    </div>
                    {{{ modalAddUser }}}
                    {{{ modalDeleteUsers }}}
                </div>
            </main>
        `;
    }
}

export default withStore(getMainState)(DialogPage);;
