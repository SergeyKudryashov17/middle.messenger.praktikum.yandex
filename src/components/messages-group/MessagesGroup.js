import Block from '../../core/Block.js';
import Message from '../message/Message';

export default class MessagesGroup extends Block {
    constructor(props) {
        props.listMessageLabels = '';
        props.messages.forEach((messageData, index) => {
            let label = `message${index}`;
            props[label] = new Message(messageData);
            props.listMessageLabels += `{{{ ${label} }}}`;
        });

        super("div", {...props});
    }

    render() {
        return `
            <div class="messages-group">
                <div class="chat-body__date">${this.props.date}</div>
                ${this.props.listMessageLabels}
            </div>
        `;
    }
}