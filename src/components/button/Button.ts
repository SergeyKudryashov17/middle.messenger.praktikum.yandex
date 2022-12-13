import Block from "../../core/Block";

import './button.css';

interface IButtonProps {
    type?: string,
    className: string,
    id?: string,
    label?: string,
    view?: string,
    events?: Record<string, Function>
}

export default class Button extends Block {
    constructor(props: IButtonProps) {
        super("button", {...props});
    }

    render(): string {
        const typeButton: string = this.props.type || 'button';

        const button: string = `
            <button class="button ${this.props.className}" type="${typeButton}" id="${this.props.id ?? ''}">
                ${this.props.label}
            </button>
        `;

        const icon: string = `
            <i class="fa ${this.props.className}" type="${typeButton}" id="${this.props.id ?? ''}" aria-hidden="true"></i>
        `;

        return this.props.view === 'icon' ? icon : button;
    }
}
