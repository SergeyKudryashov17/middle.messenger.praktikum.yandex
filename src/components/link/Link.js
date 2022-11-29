import Block from "../../core/Block";

import './link.css';
import '../button/button.css';

export default class Link extends Block {
    constructor(props) {
        // Создаём враппер дом-элемент button
        super("a", {...props});
    }

    render() {
        return `<a href="{{href}}" class="link {{className}}">${this.props.label}</a>`;
    }
}


