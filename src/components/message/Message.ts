import Block from '../../core/Block';

import './message.css';

export default class Message extends Block {
    constructor(props: any) {
        super('div', {...props});
    }

    render(): string {
        const text: string = (this.props.isText)
            ? this.props.text?.reduce((content, text) => content + `<p>${text}</p>`, '')
            : '';
        const image: string = (this.props.src) ? `<img src="${this.props.src}">` : '';
        const isMyMessage: Boolean = Boolean(this.props.fromMe);
        const isRead: Boolean = Boolean(this.props.isRead);
        const isImage: Boolean = Boolean(image);

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