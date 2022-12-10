import Block from '../../core/Block';
import Badge from "../badge/Badge";

import './dialogItem.css';

export default class DialogItem extends Block {
    constructor(props: any) {
        props.unreadMessageCounter = (props.unread)
            ? new Badge({
                value: props.unread
            }) : '';

        super("li", {...props});
    }

    render(): string {
        const isMyMessage: Boolean = Boolean(this.props.isMyMessage);

        return `
            <li class="dialog-list__item">
                <a class="dialog" href="#" data-page="chat">
                    <div class="dialog__interlocutor-photo"></div>
                    <div class="dialog__title">
                        <div class="dialog__interlocutor-name">${this.props.name}</div>
                        <div class="dialog__time">${this.props.time}</div>
                    </div>
                    <div class="dialog__message-preview">
                        ${ (isMyMessage) ? 'Вы' : '' }
                        ${this.props.preview}
                    </div>
                    <div class="dialog__unread-badge">
                        {{{ messageCounter }}}
                    </div>
                </a>
            </li>
        `;
    }
}