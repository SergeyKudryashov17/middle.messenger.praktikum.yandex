import Block from "../../core/Block";

import './label.css';

export default class Label extends Block {
    constructor(props) {
        super("label", {...props});
    }

    render() {
        const text = this.props.text ? this.props.text : '';
        const className = this.props.className ? this.props.className : '';
        const attrFor = this.props.attrFor ? this.props.attrFor : '';

        return`<label class="label ${className}" for="${attrFor}">${text}</label>`;
    }
}