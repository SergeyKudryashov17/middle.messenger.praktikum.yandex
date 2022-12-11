import Block from '../../core/Block';
import Message from '../message/Message';

export default class MessagesGroup extends Block {
    constructor(props: any) {
        props.listMessageLabels = '';
        props.messages.forEach((messageData, index) => {
            let label: string = `message${index}`;
            props[label] = new Message(messageData);
            props.listMessageLabels += `{{{ ${label} }}}`;
        });

        super("div", {...props});
    }

    render(): string {
        return `
            <div class="messages-group">
                <div class="chat-body__date">${this.props.date}</div>
                ${this.props.listMessageLabels}
            </div>
        `;
    }
}
