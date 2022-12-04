import Block from "../../core/Block";

import './button.css';

export default class Button extends Block {
    constructor(props: any) {
        super("button", {...props});
    }

    render(): string {
        const button: string = `
            <button class="button ${this.props.className}" id="${this.props.id ?? ''}">
                ${this.props.label}
            </button>
        `;

        const icon: string = `
            <i class="fa ${this.props.className}" id="${this.props.id ?? ''}" aria-hidden="true"></i>
        `;

        return this.props.type === 'icon' ? icon : button;
    }
}