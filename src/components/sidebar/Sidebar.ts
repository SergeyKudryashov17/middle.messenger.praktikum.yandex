import Block from '../../core/Block';
import DialogList from "../dialogList/DialogList";
import Input from "../input/Input";
import Link from "../link/Link";

import './sidebar.css';
import { getChatListsState } from "../../utils/getChatListsState";
import { withStore } from "../../hocs/withStore";
import { IChat } from "../../api/types";
import isEqual from "../../utils/isEqual";
import Button from "../button/Button";
import ModalNewChat from "../modalNewChat";

interface ISidebar {
    isFullSize: boolean,
    btnNewChat?: Button,
    chatState?: IChat[],
    search?: Input,
    profileLink?: Link,
    backLink?: Link,
    dialogListComponent?: DialogList | null,
    modalNewChat?: ModalNewChat
}

class Sidebar extends Block {
    constructor(props: ISidebar) {
        props.search = new Input({
            type: 'text',
            className: 'input_search-dialog',
            placeholder: '&#xf002; Поиск'
        });

        props.profileLink = new Link({
            href: '/profile',
            label: 'Профиль >'
        });

        props.btnNewChat = new Button({
            className: 'fa-plus-circle button_new-chat',
            view: 'icon',
            title: 'Новый чат',
            events: {
                click: () => props.modalNewChat?.openModal()
            }
        });

        props.backLink = new Link({
            href: '/',
            className: 'button button_main button_circle link_white',
            label: '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
        });

        props.dialogListComponent = (props.chatState) ? new DialogList({
            dialogsData: props.chatState
        }) : '';

        props.modalNewChat = new ModalNewChat({
           modalID: 'modalCreateChat'
        });

        super("aside", {...props});
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if (!isEqual({ chatState: oldProps.chatState }, { chatState: newProps.chatState })) {
            if (!newProps.chatState) {
                return false;
            }
            this.children.dialogListComponent = new DialogList({
                dialogsData: newProps.chatState
            });

            return true;
        }

        return false;
    }

    render(): string {
        const isFullSize: Boolean = Boolean(this.props.isFullSize);

        const sidebarHead: string = `
            <div class="sidebar__head">
                <div class="messenger-controls">
                    {{{ btnNewChat }}}
                    {{{ profileLink }}}
                </div>
                {{{ search }}}
            </div>
        `;

        return `
            <aside class="sidebar ${ !isFullSize ? 'sidebar_small sidebar_empty' : '' }">
                ${ isFullSize ? sidebarHead : '' }
                <div class="sidebar__body ${ !isFullSize ? 'sidebar__body_centered' : '' }">
                    ${ isFullSize ? '{{{ dialogListComponent }}}' : '{{{ backLink }}}' }
                </div>
                {{{ modalNewChat }}}
            </aside>
        `;
    }
}

export default withStore(getChatListsState)(Sidebar);
