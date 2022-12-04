import Block from "../../core/Block";

import './link.css';
import '../button/button.css';

export default class Link extends Block {
    constructor(props: any) {
        super("a", {...props});
    }

    render(): string {
        return `<a href="{{href}}" class="link {{className}}">${this.props.label}</a>`;
    }
}


