import Block from '../../core/Block.js';

import './message.css';

export default class Message extends Block {
    constructor(props) {
        super('div', {...props});
    }

    render() {
        const text = (this.props.isText)
            ? this.props.text?.reduce((content, text) => content + `<p>${text}</p>`, '')
            : '';
        const image = (this.props.src) ? this.props.src : '';
        const isMyMessage = Boolean(this.props.fromMe);
        const isRead = Boolean(this.props.isRead);
        const isImage = Boolean(image);

        return `
            <div class="message ${ isMyMessage ? 'message_your' : '' } ${ isRead ? 'message_read' : '' }">
                <div class="message__body ${ isImage ? 'message__body_file' : '' }">
                    <div class="message__content">
                        ${text}
                        ${image}
                    </div>
                    <div class="message__time">
                        ${this.props.date}
                    </div>
                </div>
            </div>
        `;
    }
}