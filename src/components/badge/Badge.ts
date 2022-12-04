import Block from '../../core/Block';

import './badge.css';

export default class Badge extends Block {
    constructor(props: any) {
        super("li", {...props});
    }

    render(): string {
        return `<div class="badge">${this.props.value}</div>`;
    }
}