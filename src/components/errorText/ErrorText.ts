import Block from "../../core/Block";

import './errorText.css';

export default class ErrorText extends Block {
    constructor(props) {
        super("small", {...props});
    }

    render(): string {
        const className: string = this.props.className ? this.props.className : '';
        return `<small class="error-label ${className}">${this.props.text}</small>`;
    }
}