import Block from "../../core/Block";

import './link.css';
import '../button/button.css';

export default class Link extends Block {
    constructor(props: any) {
        super("a", {...props});
    }

    render(): string {
        let dataAttributes: string = '';
        for (let keyAttr in this.props.dataset) {
            dataAttributes += `data-${keyAttr}="${this.props.dataset[keyAttr]}" `;
        }

        return `<a href="{{href}}" class="link {{className}}" ${dataAttributes}>${this.props.label}</a>`;
    }
}


