import Block from '../../core/Block';

import './message.css';
import { IFullMessage } from "../../api/types";
import getShortDate from "../../utils/getShortDate";

export default class Message extends Block {
    constructor(props: IFullMessage) {
        super('div', {...props});
    }

    render(): string {
        const isMyMessage: Boolean = true;
        const isRead: Boolean = false;
        const date = getShortDate(this.props.time);

        return `
            <div class="message ${ isMyMessage ? 'message_your' : '' } ${ isRead ? 'message_read' : '' }">
                <div class="message__body">
                    <div class="message__content">
                        ${this.props.content}
                    </div>
                    <div class="message__time">
                      ${date}
                    </div>
                </div>
            </div>
        `;
    }
}
