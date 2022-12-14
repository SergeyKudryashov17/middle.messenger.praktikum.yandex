import Block from '../../core/Block';

import './interlocutor.css';

interface IInterlocutorProps {
    name: string
}

export default class Interlocutor extends Block {
    constructor(props: IInterlocutorProps) {
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
