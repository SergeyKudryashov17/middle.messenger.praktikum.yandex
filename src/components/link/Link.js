import Block from "../../core/Block";

import 'link.css';

export default class Link extends Block {
    constructor(props) {
        // Создаём враппер дом-элемент button
        super("button", {...props});
    }

    render() {
        return '<a href="{{href}}" class="link {{className}}">{{label}}</a>';
    }
}


