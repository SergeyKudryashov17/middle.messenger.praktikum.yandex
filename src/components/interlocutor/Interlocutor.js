import Block from '../../core/Block.js';

import './interlocutor.css';

export default class Interlocutor extends Block {
    constructor(props = {}) {
        super("div", {...props});
    }

    render() {
        return `
            <div class="interlocutor">
                <div class="interlocutor__photo"></div>
                <div class="interlocutor__name">${this.props.name}</div>
            </div>
        `;
    }
}