import Block from "../../core/Block";

import './label.css';

interface ILabelProps {
    text?: string,
    className?: string,
    attrFor?: string,
    events?: Record<string, Function>
}

export default class Label extends Block {
    constructor(props: ILabelProps) {
        super("label", {...props});
    }

    render(): string {
        const text: string = this.props.text ? this.props.text : '';
        const className: string = this.props.className ? this.props.className : '';
        const attrFor: string = this.props.attrFor ? this.props.attrFor : '';

        return`<label class="label ${className}" for="${attrFor}">${text}</label>`;
    }
}
