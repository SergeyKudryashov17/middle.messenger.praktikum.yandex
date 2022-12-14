import Block from '../../core/Block';

import './badge.css';

interface IBadgeProps {
    value: string,
    events?: Record<string, Function>
}

export default class Badge extends Block {
    constructor(props: IBadgeProps) {
        super("li", {...props});
    }

    render(): string {
        return `<div class="badge">${this.props.value}</div>`;
    }
}
