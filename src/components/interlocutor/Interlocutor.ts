import Block from '../../core/Block';

import './interlocutor.css';

export default class Interlocutor extends Block {
    constructor(props: any = {}) {
        super("div", {...props});
    }

    render(): string {
        return `
            <div class="interlocutor">
                <div class="interlocutor__photo"></div>
                <div class="interlocutor__name">${this.props.name}</div>
            </div>
        `;
    }
}
