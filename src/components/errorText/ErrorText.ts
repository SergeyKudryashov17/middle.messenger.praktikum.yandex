import Block from "../../core/Block";

import './errorText.css';

interface IErrorTextProps {
    className?: string,
    text: string,
    events?: Record<string, Function>
}

export default class ErrorText extends Block {
    constructor(props: IErrorTextProps) {
        super("small", {...props});
    }

    render(): string {
        const className: string = this.props.className ? this.props.className : '';
        return `<small class="error-label ${className}">${this.props.text}</small>`;
    }
}
