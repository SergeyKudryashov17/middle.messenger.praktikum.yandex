import Block from "../../core/Block";

import './button.css';

export default class Button extends Block {
    constructor(props) {
        // Создаём враппер дом-элемент button
        super("button", {...props});
    }

    render() {
        const button = `
            <button class="button ${this.props.className}" id="${this.props.id ?? ''}">
                ${this.props.label}
            </button>
        `;

        const icon = `
            <i class="fa ${this.props.className}" id="${this.props.id ?? ''}" aria-hidden="true"></i>
        `;

        return this.props.type === 'icon' ? icon : button;
    }
}